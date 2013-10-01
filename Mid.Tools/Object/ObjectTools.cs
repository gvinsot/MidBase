using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Collections;

namespace Mid.Tools
{

    public class ObjectTools:IObjectTools
    {
        #region object explorer tools
        public delegate void ForEachRecursiveDelegate(object current);
        
        public static void ForEachRecursive(object root, Dictionary<Type,List<string>> allowedLinks, ForEachRecursiveDelegate todoAtBegin, ForEachRecursiveDelegate todoAtEnd)
        {
            if (todoAtBegin!=null)
            {
                todoAtBegin(root);
            }
            Type rootType = root.GetType();
            foreach (var member in GetPropertiesAndFields(rootType))
            {
                Type memberType = GetMemberType(member);
                if (memberType == null)
                {
                    continue;
                }
                if (allowedLinks != null && allowedLinks.ContainsKey(rootType) == false)
                {
                    continue;
                }
                if (allowedLinks[rootType].Contains("*") == false)
                {
                    if (allowedLinks[rootType].Contains(member.Name) == false)
                    {
                        continue;
                    }
                }
                if (memberType.IsGenericType == false)
                {
                    object value=ObjectTools.GetMemberValue(root, member);
                    if (value != null)
                    {
                        ForEachRecursive(value, allowedLinks, todoAtBegin, todoAtEnd);
                    }
                }
                else if (memberType.IsGenericType)
                {
                    IEnumerable list = ObjectTools.GetMemberValue(root, member) as IEnumerable;
                    if (list != null)
                    {
                        foreach (object item in list)
                        {
                            if (item != null)
                            {
                                ForEachRecursive(item,  allowedLinks,  todoAtBegin,todoAtEnd);
                            }
                        }
                    }
                }
            }
            if (todoAtEnd!=null)
            {
                todoAtEnd(root);
            }
        }

        public static List<T> RetrieveObjectsRecursively<T>(object root, List<Type> typesToGoThrough)
        {
            var result = new List<T>();
            if (root is T)
            {
                result.Add((T)root);
            }

            foreach (MemberInfo member in GetPropertiesAndFields(root.GetType()))
            {
                Type memberType=GetMemberType(member);
                if(memberType==null)
                {
                    continue;
                }
                if (typesToGoThrough.Contains(memberType))
                {
                    result.AddRange(RetrieveObjectsRecursively<T>(ObjectTools.GetMemberValue(root, member),  typesToGoThrough));
                }
                else if (memberType.IsGenericType && typesToGoThrough.Contains(memberType.GetGenericArguments()[0]))
                {
                    IEnumerable list = ObjectTools.GetMemberValue(root, member) as IEnumerable;
                    if (list != null)
                    {
                        foreach (object item in list)
                        {
                            result.AddRange(RetrieveObjectsRecursively<T>(item,  typesToGoThrough));
                        }
                    }
                }
            }
            return result;
        }
       
        #endregion object explorer tools

        #region Field and Properties tools

        public static List<MemberInfo> GetPropertiesAndFields(Type typeToSearchIn)
        {
            List<MemberInfo> result = new List<MemberInfo>(typeToSearchIn.GetProperties());
            result.AddRange(typeToSearchIn.GetFields());
            return result;
        }

        public static Type GetMemberType(MemberInfo FieldOrProperty)
        {
            if (FieldOrProperty is PropertyInfo)
                return ((PropertyInfo)FieldOrProperty).PropertyType;
            else if (FieldOrProperty is FieldInfo)
                return ((FieldInfo)FieldOrProperty).FieldType;
            else
                return null;
        }

        public static void CopyValues(object source, object destination)
        {
            CopyValues(source, destination, null);
        }

        public static void CopyValues(object source, object destination, List<string> excludedProperties)
        {
            Type sourceType = source.GetType();
            Type destinationType = destination.GetType();

            List<MemberInfo> sourceMembers = GetPropertiesAndFields(sourceType);
            List<MemberInfo> destMembers = GetPropertiesAndFields(destinationType);

            foreach (var member in destMembers)
            {
                if ( (excludedProperties == null) || (!excludedProperties.Contains(member.Name)))
                {
                    var commonSourceMember = sourceMembers.FirstOrDefault(m => m.Name.ToLower() == member.Name.ToLower());
                    if (commonSourceMember != null)
                    {
                        try
                        {
                            object value = GetMemberValue(source, commonSourceMember);
                            SetMemberValue(destination, member, value);
                        }
                        catch (ArgumentException ex)
                        {
                            //can happen when property has no set{} defined
                            Console.WriteLine(ex.Message);
                        }
                        catch
                        {
                            
                        }
                    }
                }
            }
        }

        public static object GetMemberValuePath(object sourceObject, string PropPath)
        {
            var propertiesChain = PropPath.Split('.');
            var currentObject = sourceObject;
            foreach (var propertyName in propertiesChain)
            {
                currentObject = GetMemberValue(currentObject, propertyName);
                if (currentObject == null)
                {
                    return null;
                }
            }
            return currentObject;
        }

        public static object GetMemberValue(object sourceObject, string PropName)
        {
            if (sourceObject == null)
                return null;
            MemberInfo prop = sourceObject.GetType().GetMember(PropName).FirstOrDefault();
            return GetMemberValue(sourceObject, prop);
        }

        public static bool HasMember(Type type, string propertyOrFieldName)
        {
            MemberInfo prop = type.GetMember(propertyOrFieldName).FirstOrDefault();
            return prop != null;
        }

        public static object GetMemberValue(object sourceObject, MemberInfo member)
        {
            if (sourceObject == null)
                return null;
            if (member is PropertyInfo)
            {
                PropertyInfo prop = member as PropertyInfo;
                if (prop == null)
                    return null;
                return prop.GetValue(sourceObject, null);
            }
            else
            {
                FieldInfo prop = member as FieldInfo;
                if (prop == null)
                    return null;
                return prop.GetValue(sourceObject);
            }
        }
        public static void SetMemberValue(object destinationObject, string memberName, object value)
        {
            MemberInfo member = destinationObject.GetType().GetMember(memberName).FirstOrDefault();
            SetMemberValue(destinationObject, member, value);
        }
        public static void SetMemberValue(object destinationObject, MemberInfo member, object value)
        {
            if (destinationObject == null)
                return;
            if (member is PropertyInfo)
            {
                PropertyInfo prop = member as PropertyInfo;
                if (prop == null)
                    return;
                if(prop.CanWrite)
                    prop.SetValue(destinationObject, value, null);
            }
            else
            {
                FieldInfo prop = member as FieldInfo;
                if (prop == null)
                    return;
                prop.SetValue(destinationObject, value);
            }
        }
        #endregion Field and Properties tools
    }

}
