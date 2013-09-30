namespace Entity
{
	public enum ImagePosition
    {
        None    =   0,
        Stretch =   1,
        Fill    =   2,
        Fit     =   3,
        Center  =   4,
    }

    public enum MediaType
    {
        None            =   0,
        Video           = 1,
        Flash           = 2,
        Capture         = 3,
        TunerTv         = 4,
        Image           = 5,
        WebPage         = 6,
        Scroller        = 7,
        Text            = 8,
        PowerPoint      = 9,
        Audio           = 10,
        Rss             = 11,               
        WmpPlayer       = 12,
        Playlist        = 13,
        Channel         = 14,
        DesignTemplate  = 15,
        Tag             = 16,
        DesignInstance  = 17,
        ScreenLayout    = 18,
        PlaylistOfZone  = 19,
        FlashEditable   = 20,
        PlaylistOfFlash = 21,
        DateTime        = 22,
        Color           = 23,
        Enum            = 24,
        Number          = 25,
        PlaylistLocalInputParent    = 26,
        FlashEditableTemplate       = 27,
        TagLocalInputParent         = 28,
        TagLocalInputChild          = 29,
        PlaylistLocalInputChild     = 30,
		TvPassThru					= 31
    }

    public enum ContentFileState
    {
        Unknown                 = 0,
        Uploading               = 1,
        Uploaded                = 2,
        Ready                   = 3,
        Reencoding              = 4,
        Reencoded               = 5,
        ReencodedWithErrors     = 6,
        WaitingForReencoding    = 7,
        WaitingForUpload        = 8,
        UploadedWithError       = 9,
    }

}