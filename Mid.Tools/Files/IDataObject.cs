namespace Mid.Tools
{
    public interface IDataObject<T>
    {
        string Path { get; set; }
        T Value { get; set; }
        void Push();
        void Delete();
    }
}
