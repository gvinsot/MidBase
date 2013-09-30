using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
using System.Text;
using Core.Threads;
using Entity;
using fastJSON;

namespace Managers
{
    public class MediaManager
    {
        public static string GetMedias(long workgroupId, int pageNumber=0, int pageSize=30)
        {
            using (var model = new DataModelContainer())
            {
                var medias = (from wg in model.WorkgroupSet
                              where wg.Id == workgroupId
                              from mr in wg.MediaRight
                              select mr.Media)
                            .Skip(pageSize*(pageNumber-1))
		                    .Take(pageSize)
                            .ToList();

                return SerializeMedias(medias);
            }
        }


        public static string GetMediasFromIds(List<long> mediasIds, int pageNumber = 0, int pageSize = 30)
        {
            using (var model = new DataModelContainer())
            {
                var medias = (from m in model.MediaSet
                              where mediasIds.Contains(m.Id)
                              select m)
                            .Skip(pageSize * (pageNumber - 1))
                            .Take(pageSize)
                            .ToList();

                return SerializeMedias(medias);
            }
        }


        public static void DeleteMedias(List<long> mediasIds)
        {
            ThreadTools.TryDBMethodManyTimes(5,TimeSpan.FromMilliseconds(300),delegate
            {
                using (var model = new DataModelContainer())
                {
                    var medias = (from m in model.MediaSet
                                  where mediasIds.Contains(m.Id)
                                  select m);

                    foreach (var media in medias)
                    {
                        model.DeleteObject(media);
                    }

                    model.SaveChanges();
                }
            });
        }




        private static string SerializeMedias(object toSerialize)
        {
            string test = JSON.Instance.ToJSON(toSerialize, new JSONParameters()
            {
                AllowedLinks = new Dictionary<Type, List<string>>
                        {
                            {typeof(Media),new List<string>{"Name","Trigger","OwnerWorkgroup","File"}},
                            {typeof(Workgroup),new List<string>{"Id","Name"}},
                            {typeof(File),new List<string>{"Id","Path","OriginalDuration","Width","Height"}},
                            {typeof(Planning),new List<string>{"Id","StartDate","EndDate","IsOnMonday","IsOnTuesday"}}
                        }
            });
            return test;
        }


    }
}
