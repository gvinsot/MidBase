
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, and Azure
-- --------------------------------------------------
-- Date Created: 08/09/2013 09:25:21
-- Generated from EDMX file: C:\Users\g.vinsot\Documents\digital\Entity\DataModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [digital];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_DesignZone]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ZoneSet] DROP CONSTRAINT [FK_DesignZone];
GO
IF OBJECT_ID(N'[dbo].[FK_ZonePlaylist]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ZoneSet] DROP CONSTRAINT [FK_ZonePlaylist];
GO
IF OBJECT_ID(N'[dbo].[FK_PlaylistMediaMedia]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaContainedSet] DROP CONSTRAINT [FK_PlaylistMediaMedia];
GO
IF OBJECT_ID(N'[dbo].[FK_MediaContainerMediaContained]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaContainedSet] DROP CONSTRAINT [FK_MediaContainerMediaContained];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkgroupHardware]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[HardwareSet] DROP CONSTRAINT [FK_WorkgroupHardware];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkgroupUser_Workgroup]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WorkgroupUser] DROP CONSTRAINT [FK_WorkgroupUser_Workgroup];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkgroupUser_User]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WorkgroupUser] DROP CONSTRAINT [FK_WorkgroupUser_User];
GO
IF OBJECT_ID(N'[dbo].[FK_ExternalProgramFile_ExternalProgram]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ExternalProgramFile] DROP CONSTRAINT [FK_ExternalProgramFile_ExternalProgram];
GO
IF OBJECT_ID(N'[dbo].[FK_ExternalProgramFile_File]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ExternalProgramFile] DROP CONSTRAINT [FK_ExternalProgramFile_File];
GO
IF OBJECT_ID(N'[dbo].[FK_FlashFile_Flash]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[FlashFile] DROP CONSTRAINT [FK_FlashFile_Flash];
GO
IF OBJECT_ID(N'[dbo].[FK_FlashFile_File]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[FlashFile] DROP CONSTRAINT [FK_FlashFile_File];
GO
IF OBJECT_ID(N'[dbo].[FK_ImageFile]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaSet_Image] DROP CONSTRAINT [FK_ImageFile];
GO
IF OBJECT_ID(N'[dbo].[FK_VideoFile]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaSet_Video] DROP CONSTRAINT [FK_VideoFile];
GO
IF OBJECT_ID(N'[dbo].[FK_FeedFile_Feed]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[FeedFile] DROP CONSTRAINT [FK_FeedFile_Feed];
GO
IF OBJECT_ID(N'[dbo].[FK_FeedFile_File]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[FeedFile] DROP CONSTRAINT [FK_FeedFile_File];
GO
IF OBJECT_ID(N'[dbo].[FK_MediaTrigger]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TriggerSet] DROP CONSTRAINT [FK_MediaTrigger];
GO
IF OBJECT_ID(N'[dbo].[FK_MediaContainerHardware]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[HardwareSet] DROP CONSTRAINT [FK_MediaContainerHardware];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkgroupWorkgroup]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WorkgroupSet] DROP CONSTRAINT [FK_WorkgroupWorkgroup];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkgroupBandwidthSettings]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WorkgroupSet] DROP CONSTRAINT [FK_WorkgroupBandwidthSettings];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkgroupOpeningHours]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WorkgroupSet] DROP CONSTRAINT [FK_WorkgroupOpeningHours];
GO
IF OBJECT_ID(N'[dbo].[FK_HardwareOpeningHours]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[HardwareSet] DROP CONSTRAINT [FK_HardwareOpeningHours];
GO
IF OBJECT_ID(N'[dbo].[FK_HardwareConnectionSettings]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[HardwareSet] DROP CONSTRAINT [FK_HardwareConnectionSettings];
GO
IF OBJECT_ID(N'[dbo].[FK_HardwareBandwidthSettings]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[HardwareSet] DROP CONSTRAINT [FK_HardwareBandwidthSettings];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkgroupConnectionSettings]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WorkgroupSet] DROP CONSTRAINT [FK_WorkgroupConnectionSettings];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkgroupMediaRight]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaRightSet] DROP CONSTRAINT [FK_WorkgroupMediaRight];
GO
IF OBJECT_ID(N'[dbo].[FK_MediaRightMedia]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaRightSet] DROP CONSTRAINT [FK_MediaRightMedia];
GO
IF OBJECT_ID(N'[dbo].[FK_GroupWorkgroup_Group]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[GroupWorkgroup] DROP CONSTRAINT [FK_GroupWorkgroup_Group];
GO
IF OBJECT_ID(N'[dbo].[FK_GroupWorkgroup_Workgroup]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[GroupWorkgroup] DROP CONSTRAINT [FK_GroupWorkgroup_Workgroup];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkgroupMediaOwner]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaSet] DROP CONSTRAINT [FK_WorkgroupMediaOwner];
GO
IF OBJECT_ID(N'[dbo].[FK_Design_inherits_Media]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaSet_Design] DROP CONSTRAINT [FK_Design_inherits_Media];
GO
IF OBJECT_ID(N'[dbo].[FK_MediaContainer_inherits_Media]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaSet_MediaContainer] DROP CONSTRAINT [FK_MediaContainer_inherits_Media];
GO
IF OBJECT_ID(N'[dbo].[FK_ExternalProgram_inherits_Media]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaSet_ExternalProgram] DROP CONSTRAINT [FK_ExternalProgram_inherits_Media];
GO
IF OBJECT_ID(N'[dbo].[FK_Flash_inherits_Media]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaSet_Flash] DROP CONSTRAINT [FK_Flash_inherits_Media];
GO
IF OBJECT_ID(N'[dbo].[FK_Image_inherits_Media]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaSet_Image] DROP CONSTRAINT [FK_Image_inherits_Media];
GO
IF OBJECT_ID(N'[dbo].[FK_Video_inherits_Media]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaSet_Video] DROP CONSTRAINT [FK_Video_inherits_Media];
GO
IF OBJECT_ID(N'[dbo].[FK_Feed_inherits_Media]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaSet_Feed] DROP CONSTRAINT [FK_Feed_inherits_Media];
GO
IF OBJECT_ID(N'[dbo].[FK_Text_inherits_Media]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaSet_Text] DROP CONSTRAINT [FK_Text_inherits_Media];
GO
IF OBJECT_ID(N'[dbo].[FK_Url_inherits_Media]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaSet_Url] DROP CONSTRAINT [FK_Url_inherits_Media];
GO
IF OBJECT_ID(N'[dbo].[FK_Planning_inherits_Trigger]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TriggerSet_Planning] DROP CONSTRAINT [FK_Planning_inherits_Trigger];
GO
IF OBJECT_ID(N'[dbo].[FK_KeyboardEvent_inherits_Trigger]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TriggerSet_KeyboardEvent] DROP CONSTRAINT [FK_KeyboardEvent_inherits_Trigger];
GO
IF OBJECT_ID(N'[dbo].[FK_TimerEvent_inherits_Trigger]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TriggerSet_TimerEvent] DROP CONSTRAINT [FK_TimerEvent_inherits_Trigger];
GO
IF OBJECT_ID(N'[dbo].[FK_MouseEvent_inherits_Trigger]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TriggerSet_MouseEvent] DROP CONSTRAINT [FK_MouseEvent_inherits_Trigger];
GO
IF OBJECT_ID(N'[dbo].[FK_UsbEvent_inherits_Trigger]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TriggerSet_UsbEvent] DROP CONSTRAINT [FK_UsbEvent_inherits_Trigger];
GO
IF OBJECT_ID(N'[dbo].[FK_NetworkEvent_inherits_Trigger]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TriggerSet_NetworkEvent] DROP CONSTRAINT [FK_NetworkEvent_inherits_Trigger];
GO
IF OBJECT_ID(N'[dbo].[FK_Streaming_inherits_Media]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MediaSet_Streaming] DROP CONSTRAINT [FK_Streaming_inherits_Media];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[MediaSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MediaSet];
GO
IF OBJECT_ID(N'[dbo].[ZoneSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ZoneSet];
GO
IF OBJECT_ID(N'[dbo].[MediaContainedSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MediaContainedSet];
GO
IF OBJECT_ID(N'[dbo].[UserSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UserSet];
GO
IF OBJECT_ID(N'[dbo].[WorkgroupSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[WorkgroupSet];
GO
IF OBJECT_ID(N'[dbo].[HardwareSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[HardwareSet];
GO
IF OBJECT_ID(N'[dbo].[FileSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FileSet];
GO
IF OBJECT_ID(N'[dbo].[TriggerSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TriggerSet];
GO
IF OBJECT_ID(N'[dbo].[BandwidthSettingsSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[BandwidthSettingsSet];
GO
IF OBJECT_ID(N'[dbo].[OpeningHoursSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[OpeningHoursSet];
GO
IF OBJECT_ID(N'[dbo].[ConnectionSettingsSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ConnectionSettingsSet];
GO
IF OBJECT_ID(N'[dbo].[MediaRightSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MediaRightSet];
GO
IF OBJECT_ID(N'[dbo].[GroupSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[GroupSet];
GO
IF OBJECT_ID(N'[dbo].[MediaSet_Design]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MediaSet_Design];
GO
IF OBJECT_ID(N'[dbo].[MediaSet_MediaContainer]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MediaSet_MediaContainer];
GO
IF OBJECT_ID(N'[dbo].[MediaSet_ExternalProgram]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MediaSet_ExternalProgram];
GO
IF OBJECT_ID(N'[dbo].[MediaSet_Flash]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MediaSet_Flash];
GO
IF OBJECT_ID(N'[dbo].[MediaSet_Image]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MediaSet_Image];
GO
IF OBJECT_ID(N'[dbo].[MediaSet_Video]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MediaSet_Video];
GO
IF OBJECT_ID(N'[dbo].[MediaSet_Feed]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MediaSet_Feed];
GO
IF OBJECT_ID(N'[dbo].[MediaSet_Text]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MediaSet_Text];
GO
IF OBJECT_ID(N'[dbo].[MediaSet_Url]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MediaSet_Url];
GO
IF OBJECT_ID(N'[dbo].[TriggerSet_Planning]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TriggerSet_Planning];
GO
IF OBJECT_ID(N'[dbo].[TriggerSet_KeyboardEvent]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TriggerSet_KeyboardEvent];
GO
IF OBJECT_ID(N'[dbo].[TriggerSet_TimerEvent]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TriggerSet_TimerEvent];
GO
IF OBJECT_ID(N'[dbo].[TriggerSet_MouseEvent]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TriggerSet_MouseEvent];
GO
IF OBJECT_ID(N'[dbo].[TriggerSet_UsbEvent]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TriggerSet_UsbEvent];
GO
IF OBJECT_ID(N'[dbo].[TriggerSet_NetworkEvent]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TriggerSet_NetworkEvent];
GO
IF OBJECT_ID(N'[dbo].[MediaSet_Streaming]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MediaSet_Streaming];
GO
IF OBJECT_ID(N'[dbo].[WorkgroupUser]', 'U') IS NOT NULL
    DROP TABLE [dbo].[WorkgroupUser];
GO
IF OBJECT_ID(N'[dbo].[ExternalProgramFile]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ExternalProgramFile];
GO
IF OBJECT_ID(N'[dbo].[FlashFile]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FlashFile];
GO
IF OBJECT_ID(N'[dbo].[FeedFile]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FeedFile];
GO
IF OBJECT_ID(N'[dbo].[GroupWorkgroup]', 'U') IS NOT NULL
    DROP TABLE [dbo].[GroupWorkgroup];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'MediaSet'
CREATE TABLE [dbo].[MediaSet] (
    [Id] bigint IDENTITY(1,1) NOT NULL,
    [Duration] time  NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [OwnerWorkgroup_Id] bigint  NOT NULL
);
GO

-- Creating table 'ZoneSet'
CREATE TABLE [dbo].[ZoneSet] (
    [Id] bigint IDENTITY(1,1) NOT NULL,
    [DesignId] bigint  NOT NULL,
    [X] float  NOT NULL,
    [Y] float  NOT NULL,
    [Z] nvarchar(max)  NOT NULL,
    [W] nvarchar(max)  NOT NULL,
    [H] nvarchar(max)  NOT NULL,
    [Playlist_Id] bigint  NOT NULL
);
GO

-- Creating table 'MediaContainedSet'
CREATE TABLE [dbo].[MediaContainedSet] (
    [Id] bigint IDENTITY(1,1) NOT NULL,
    [PlaylistId] bigint  NOT NULL,
    [Order] nvarchar(max)  NOT NULL,
    [Media_Id] bigint  NOT NULL,
    [MediaContainer_Id] bigint  NOT NULL
);
GO

-- Creating table 'UserSet'
CREATE TABLE [dbo].[UserSet] (
    [Id] bigint IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Email] nvarchar(max)  NOT NULL,
    [PasswordHash] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'WorkgroupSet'
CREATE TABLE [dbo].[WorkgroupSet] (
    [Id] bigint IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [ParentWorkgroupId] bigint  NULL,
    [BandwidthSettings_Id] bigint  NULL,
    [OpeningHours_Id] bigint  NULL,
    [ConnectionSettings_Id] bigint  NULL
);
GO

-- Creating table 'HardwareSet'
CREATE TABLE [dbo].[HardwareSet] (
    [Id] bigint IDENTITY(1,1) NOT NULL,
    [WorkgroupId] bigint  NOT NULL,
    [MediaContainerId] bigint  NOT NULL,
    [VirtualScreenWidth] int  NOT NULL,
    [VirtualScreenHeight] int  NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Mac] nvarchar(max)  NOT NULL,
    [LastReport] datetime  NOT NULL,
    [Status] int  NOT NULL,
    [LastErrorMessage] nvarchar(max)  NOT NULL,
    [OpeningHours_Id] bigint  NULL,
    [ConnectionSettings_Id] bigint  NULL,
    [BandwidthSettings_Id] bigint  NULL
);
GO

-- Creating table 'FileSet'
CREATE TABLE [dbo].[FileSet] (
    [Id] bigint IDENTITY(1,1) NOT NULL,
    [Path] nvarchar(max)  NOT NULL,
    [OriginalDuration] time  NULL,
    [Width] int  NULL,
    [Height] int  NULL
);
GO

-- Creating table 'TriggerSet'
CREATE TABLE [dbo].[TriggerSet] (
    [Id] bigint IDENTITY(1,1) NOT NULL,
    [MediaId] bigint  NOT NULL
);
GO

-- Creating table 'BandwidthSettingsSet'
CREATE TABLE [dbo].[BandwidthSettingsSet] (
    [Id] bigint IDENTITY(1,1) NOT NULL
);
GO

-- Creating table 'OpeningHoursSet'
CREATE TABLE [dbo].[OpeningHoursSet] (
    [Id] bigint IDENTITY(1,1) NOT NULL
);
GO

-- Creating table 'ConnectionSettingsSet'
CREATE TABLE [dbo].[ConnectionSettingsSet] (
    [Id] bigint IDENTITY(1,1) NOT NULL
);
GO

-- Creating table 'MediaRightSet'
CREATE TABLE [dbo].[MediaRightSet] (
    [Id] bigint IDENTITY(1,1) NOT NULL,
    [WorkgroupId] bigint  NOT NULL,
    [Media_Id] bigint  NOT NULL
);
GO

-- Creating table 'GroupSet'
CREATE TABLE [dbo].[GroupSet] (
    [Id] bigint IDENTITY(1,1) NOT NULL
);
GO

-- Creating table 'UserRightsSet'
CREATE TABLE [dbo].[UserRightsSet] (
    [Id] bigint IDENTITY(1,1) NOT NULL,
    [UserId] bigint  NOT NULL
);
GO

-- Creating table 'MediaSet_Design'
CREATE TABLE [dbo].[MediaSet_Design] (
    [Id] bigint  NOT NULL
);
GO

-- Creating table 'MediaSet_MediaContainer'
CREATE TABLE [dbo].[MediaSet_MediaContainer] (
    [IsRandom] bit  NOT NULL,
    [NbItemsToPlay] int  NOT NULL,
    [AllowedTypes] nvarchar(max)  NOT NULL,
    [Id] bigint  NOT NULL
);
GO

-- Creating table 'MediaSet_ExternalProgram'
CREATE TABLE [dbo].[MediaSet_ExternalProgram] (
    [Id] bigint  NOT NULL
);
GO

-- Creating table 'MediaSet_Flash'
CREATE TABLE [dbo].[MediaSet_Flash] (
    [Id] bigint  NOT NULL
);
GO

-- Creating table 'MediaSet_Image'
CREATE TABLE [dbo].[MediaSet_Image] (
    [Aspect] int  NOT NULL,
    [Id] bigint  NOT NULL,
    [File_Id] bigint  NOT NULL
);
GO

-- Creating table 'MediaSet_Video'
CREATE TABLE [dbo].[MediaSet_Video] (
    [Aspect] int  NOT NULL,
    [Volume] int  NOT NULL,
    [Id] bigint  NOT NULL,
    [File_Id] bigint  NOT NULL
);
GO

-- Creating table 'MediaSet_Feed'
CREATE TABLE [dbo].[MediaSet_Feed] (
    [Id] bigint  NOT NULL
);
GO

-- Creating table 'MediaSet_Text'
CREATE TABLE [dbo].[MediaSet_Text] (
    [Value] nvarchar(max)  NOT NULL,
    [Id] bigint  NOT NULL
);
GO

-- Creating table 'MediaSet_Url'
CREATE TABLE [dbo].[MediaSet_Url] (
    [Value] nvarchar(max)  NOT NULL,
    [Id] bigint  NOT NULL
);
GO

-- Creating table 'TriggerSet_Planning'
CREATE TABLE [dbo].[TriggerSet_Planning] (
    [StartDate] datetime  NULL,
    [EndDate] datetime  NULL,
    [DayStartTime] time  NULL,
    [DayEndTime] time  NULL,
    [IsOnMonday] bit  NOT NULL,
    [IsOnTuesday] bit  NOT NULL,
    [IsOnWednesday] bit  NOT NULL,
    [IsOnThursday] bit  NOT NULL,
    [IsOnFriday] bit  NOT NULL,
    [IsOnSaturday] bit  NOT NULL,
    [IsOnSunday] bit  NOT NULL,
    [Id] bigint  NOT NULL
);
GO

-- Creating table 'TriggerSet_KeyboardEvent'
CREATE TABLE [dbo].[TriggerSet_KeyboardEvent] (
    [Id] bigint  NOT NULL
);
GO

-- Creating table 'TriggerSet_TimerEvent'
CREATE TABLE [dbo].[TriggerSet_TimerEvent] (
    [Id] bigint  NOT NULL
);
GO

-- Creating table 'TriggerSet_MouseEvent'
CREATE TABLE [dbo].[TriggerSet_MouseEvent] (
    [Id] bigint  NOT NULL
);
GO

-- Creating table 'TriggerSet_UsbEvent'
CREATE TABLE [dbo].[TriggerSet_UsbEvent] (
    [Id] bigint  NOT NULL
);
GO

-- Creating table 'TriggerSet_NetworkEvent'
CREATE TABLE [dbo].[TriggerSet_NetworkEvent] (
    [Id] bigint  NOT NULL
);
GO

-- Creating table 'MediaSet_Streaming'
CREATE TABLE [dbo].[MediaSet_Streaming] (
    [Url] nvarchar(max)  NOT NULL,
    [Volume] nvarchar(max)  NOT NULL,
    [Id] bigint  NOT NULL
);
GO

-- Creating table 'WorkgroupUser'
CREATE TABLE [dbo].[WorkgroupUser] (
    [Workgroup_Id] bigint  NOT NULL,
    [User_Id] bigint  NOT NULL
);
GO

-- Creating table 'ExternalProgramFile'
CREATE TABLE [dbo].[ExternalProgramFile] (
    [ExternalProgram_Id] bigint  NOT NULL,
    [File_Id] bigint  NOT NULL
);
GO

-- Creating table 'FlashFile'
CREATE TABLE [dbo].[FlashFile] (
    [Flash_Id] bigint  NOT NULL,
    [File_Id] bigint  NOT NULL
);
GO

-- Creating table 'FeedFile'
CREATE TABLE [dbo].[FeedFile] (
    [Feed_Id] bigint  NOT NULL,
    [File_Id] bigint  NOT NULL
);
GO

-- Creating table 'GroupWorkgroup'
CREATE TABLE [dbo].[GroupWorkgroup] (
    [Group_Id] bigint  NOT NULL,
    [Workgroup_Id] bigint  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'MediaSet'
ALTER TABLE [dbo].[MediaSet]
ADD CONSTRAINT [PK_MediaSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ZoneSet'
ALTER TABLE [dbo].[ZoneSet]
ADD CONSTRAINT [PK_ZoneSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'MediaContainedSet'
ALTER TABLE [dbo].[MediaContainedSet]
ADD CONSTRAINT [PK_MediaContainedSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'UserSet'
ALTER TABLE [dbo].[UserSet]
ADD CONSTRAINT [PK_UserSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'WorkgroupSet'
ALTER TABLE [dbo].[WorkgroupSet]
ADD CONSTRAINT [PK_WorkgroupSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'HardwareSet'
ALTER TABLE [dbo].[HardwareSet]
ADD CONSTRAINT [PK_HardwareSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'FileSet'
ALTER TABLE [dbo].[FileSet]
ADD CONSTRAINT [PK_FileSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'TriggerSet'
ALTER TABLE [dbo].[TriggerSet]
ADD CONSTRAINT [PK_TriggerSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'BandwidthSettingsSet'
ALTER TABLE [dbo].[BandwidthSettingsSet]
ADD CONSTRAINT [PK_BandwidthSettingsSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'OpeningHoursSet'
ALTER TABLE [dbo].[OpeningHoursSet]
ADD CONSTRAINT [PK_OpeningHoursSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ConnectionSettingsSet'
ALTER TABLE [dbo].[ConnectionSettingsSet]
ADD CONSTRAINT [PK_ConnectionSettingsSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'MediaRightSet'
ALTER TABLE [dbo].[MediaRightSet]
ADD CONSTRAINT [PK_MediaRightSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'GroupSet'
ALTER TABLE [dbo].[GroupSet]
ADD CONSTRAINT [PK_GroupSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'UserRightsSet'
ALTER TABLE [dbo].[UserRightsSet]
ADD CONSTRAINT [PK_UserRightsSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'MediaSet_Design'
ALTER TABLE [dbo].[MediaSet_Design]
ADD CONSTRAINT [PK_MediaSet_Design]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'MediaSet_MediaContainer'
ALTER TABLE [dbo].[MediaSet_MediaContainer]
ADD CONSTRAINT [PK_MediaSet_MediaContainer]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'MediaSet_ExternalProgram'
ALTER TABLE [dbo].[MediaSet_ExternalProgram]
ADD CONSTRAINT [PK_MediaSet_ExternalProgram]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'MediaSet_Flash'
ALTER TABLE [dbo].[MediaSet_Flash]
ADD CONSTRAINT [PK_MediaSet_Flash]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'MediaSet_Image'
ALTER TABLE [dbo].[MediaSet_Image]
ADD CONSTRAINT [PK_MediaSet_Image]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'MediaSet_Video'
ALTER TABLE [dbo].[MediaSet_Video]
ADD CONSTRAINT [PK_MediaSet_Video]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'MediaSet_Feed'
ALTER TABLE [dbo].[MediaSet_Feed]
ADD CONSTRAINT [PK_MediaSet_Feed]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'MediaSet_Text'
ALTER TABLE [dbo].[MediaSet_Text]
ADD CONSTRAINT [PK_MediaSet_Text]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'MediaSet_Url'
ALTER TABLE [dbo].[MediaSet_Url]
ADD CONSTRAINT [PK_MediaSet_Url]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'TriggerSet_Planning'
ALTER TABLE [dbo].[TriggerSet_Planning]
ADD CONSTRAINT [PK_TriggerSet_Planning]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'TriggerSet_KeyboardEvent'
ALTER TABLE [dbo].[TriggerSet_KeyboardEvent]
ADD CONSTRAINT [PK_TriggerSet_KeyboardEvent]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'TriggerSet_TimerEvent'
ALTER TABLE [dbo].[TriggerSet_TimerEvent]
ADD CONSTRAINT [PK_TriggerSet_TimerEvent]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'TriggerSet_MouseEvent'
ALTER TABLE [dbo].[TriggerSet_MouseEvent]
ADD CONSTRAINT [PK_TriggerSet_MouseEvent]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'TriggerSet_UsbEvent'
ALTER TABLE [dbo].[TriggerSet_UsbEvent]
ADD CONSTRAINT [PK_TriggerSet_UsbEvent]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'TriggerSet_NetworkEvent'
ALTER TABLE [dbo].[TriggerSet_NetworkEvent]
ADD CONSTRAINT [PK_TriggerSet_NetworkEvent]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'MediaSet_Streaming'
ALTER TABLE [dbo].[MediaSet_Streaming]
ADD CONSTRAINT [PK_MediaSet_Streaming]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Workgroup_Id], [User_Id] in table 'WorkgroupUser'
ALTER TABLE [dbo].[WorkgroupUser]
ADD CONSTRAINT [PK_WorkgroupUser]
    PRIMARY KEY NONCLUSTERED ([Workgroup_Id], [User_Id] ASC);
GO

-- Creating primary key on [ExternalProgram_Id], [File_Id] in table 'ExternalProgramFile'
ALTER TABLE [dbo].[ExternalProgramFile]
ADD CONSTRAINT [PK_ExternalProgramFile]
    PRIMARY KEY NONCLUSTERED ([ExternalProgram_Id], [File_Id] ASC);
GO

-- Creating primary key on [Flash_Id], [File_Id] in table 'FlashFile'
ALTER TABLE [dbo].[FlashFile]
ADD CONSTRAINT [PK_FlashFile]
    PRIMARY KEY NONCLUSTERED ([Flash_Id], [File_Id] ASC);
GO

-- Creating primary key on [Feed_Id], [File_Id] in table 'FeedFile'
ALTER TABLE [dbo].[FeedFile]
ADD CONSTRAINT [PK_FeedFile]
    PRIMARY KEY NONCLUSTERED ([Feed_Id], [File_Id] ASC);
GO

-- Creating primary key on [Group_Id], [Workgroup_Id] in table 'GroupWorkgroup'
ALTER TABLE [dbo].[GroupWorkgroup]
ADD CONSTRAINT [PK_GroupWorkgroup]
    PRIMARY KEY NONCLUSTERED ([Group_Id], [Workgroup_Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [DesignId] in table 'ZoneSet'
ALTER TABLE [dbo].[ZoneSet]
ADD CONSTRAINT [FK_DesignZone]
    FOREIGN KEY ([DesignId])
    REFERENCES [dbo].[MediaSet_Design]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_DesignZone'
CREATE INDEX [IX_FK_DesignZone]
ON [dbo].[ZoneSet]
    ([DesignId]);
GO

-- Creating foreign key on [Playlist_Id] in table 'ZoneSet'
ALTER TABLE [dbo].[ZoneSet]
ADD CONSTRAINT [FK_ZonePlaylist]
    FOREIGN KEY ([Playlist_Id])
    REFERENCES [dbo].[MediaSet_MediaContainer]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ZonePlaylist'
CREATE INDEX [IX_FK_ZonePlaylist]
ON [dbo].[ZoneSet]
    ([Playlist_Id]);
GO

-- Creating foreign key on [Media_Id] in table 'MediaContainedSet'
ALTER TABLE [dbo].[MediaContainedSet]
ADD CONSTRAINT [FK_PlaylistMediaMedia]
    FOREIGN KEY ([Media_Id])
    REFERENCES [dbo].[MediaSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_PlaylistMediaMedia'
CREATE INDEX [IX_FK_PlaylistMediaMedia]
ON [dbo].[MediaContainedSet]
    ([Media_Id]);
GO

-- Creating foreign key on [MediaContainer_Id] in table 'MediaContainedSet'
ALTER TABLE [dbo].[MediaContainedSet]
ADD CONSTRAINT [FK_MediaContainerMediaContained]
    FOREIGN KEY ([MediaContainer_Id])
    REFERENCES [dbo].[MediaSet_MediaContainer]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_MediaContainerMediaContained'
CREATE INDEX [IX_FK_MediaContainerMediaContained]
ON [dbo].[MediaContainedSet]
    ([MediaContainer_Id]);
GO

-- Creating foreign key on [WorkgroupId] in table 'HardwareSet'
ALTER TABLE [dbo].[HardwareSet]
ADD CONSTRAINT [FK_WorkgroupHardware]
    FOREIGN KEY ([WorkgroupId])
    REFERENCES [dbo].[WorkgroupSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkgroupHardware'
CREATE INDEX [IX_FK_WorkgroupHardware]
ON [dbo].[HardwareSet]
    ([WorkgroupId]);
GO

-- Creating foreign key on [Workgroup_Id] in table 'WorkgroupUser'
ALTER TABLE [dbo].[WorkgroupUser]
ADD CONSTRAINT [FK_WorkgroupUser_Workgroup]
    FOREIGN KEY ([Workgroup_Id])
    REFERENCES [dbo].[WorkgroupSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [User_Id] in table 'WorkgroupUser'
ALTER TABLE [dbo].[WorkgroupUser]
ADD CONSTRAINT [FK_WorkgroupUser_User]
    FOREIGN KEY ([User_Id])
    REFERENCES [dbo].[UserSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkgroupUser_User'
CREATE INDEX [IX_FK_WorkgroupUser_User]
ON [dbo].[WorkgroupUser]
    ([User_Id]);
GO

-- Creating foreign key on [ExternalProgram_Id] in table 'ExternalProgramFile'
ALTER TABLE [dbo].[ExternalProgramFile]
ADD CONSTRAINT [FK_ExternalProgramFile_ExternalProgram]
    FOREIGN KEY ([ExternalProgram_Id])
    REFERENCES [dbo].[MediaSet_ExternalProgram]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [File_Id] in table 'ExternalProgramFile'
ALTER TABLE [dbo].[ExternalProgramFile]
ADD CONSTRAINT [FK_ExternalProgramFile_File]
    FOREIGN KEY ([File_Id])
    REFERENCES [dbo].[FileSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ExternalProgramFile_File'
CREATE INDEX [IX_FK_ExternalProgramFile_File]
ON [dbo].[ExternalProgramFile]
    ([File_Id]);
GO

-- Creating foreign key on [Flash_Id] in table 'FlashFile'
ALTER TABLE [dbo].[FlashFile]
ADD CONSTRAINT [FK_FlashFile_Flash]
    FOREIGN KEY ([Flash_Id])
    REFERENCES [dbo].[MediaSet_Flash]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [File_Id] in table 'FlashFile'
ALTER TABLE [dbo].[FlashFile]
ADD CONSTRAINT [FK_FlashFile_File]
    FOREIGN KEY ([File_Id])
    REFERENCES [dbo].[FileSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_FlashFile_File'
CREATE INDEX [IX_FK_FlashFile_File]
ON [dbo].[FlashFile]
    ([File_Id]);
GO

-- Creating foreign key on [File_Id] in table 'MediaSet_Image'
ALTER TABLE [dbo].[MediaSet_Image]
ADD CONSTRAINT [FK_ImageFile]
    FOREIGN KEY ([File_Id])
    REFERENCES [dbo].[FileSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ImageFile'
CREATE INDEX [IX_FK_ImageFile]
ON [dbo].[MediaSet_Image]
    ([File_Id]);
GO

-- Creating foreign key on [File_Id] in table 'MediaSet_Video'
ALTER TABLE [dbo].[MediaSet_Video]
ADD CONSTRAINT [FK_VideoFile]
    FOREIGN KEY ([File_Id])
    REFERENCES [dbo].[FileSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_VideoFile'
CREATE INDEX [IX_FK_VideoFile]
ON [dbo].[MediaSet_Video]
    ([File_Id]);
GO

-- Creating foreign key on [Feed_Id] in table 'FeedFile'
ALTER TABLE [dbo].[FeedFile]
ADD CONSTRAINT [FK_FeedFile_Feed]
    FOREIGN KEY ([Feed_Id])
    REFERENCES [dbo].[MediaSet_Feed]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [File_Id] in table 'FeedFile'
ALTER TABLE [dbo].[FeedFile]
ADD CONSTRAINT [FK_FeedFile_File]
    FOREIGN KEY ([File_Id])
    REFERENCES [dbo].[FileSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_FeedFile_File'
CREATE INDEX [IX_FK_FeedFile_File]
ON [dbo].[FeedFile]
    ([File_Id]);
GO

-- Creating foreign key on [MediaId] in table 'TriggerSet'
ALTER TABLE [dbo].[TriggerSet]
ADD CONSTRAINT [FK_MediaTrigger]
    FOREIGN KEY ([MediaId])
    REFERENCES [dbo].[MediaSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_MediaTrigger'
CREATE INDEX [IX_FK_MediaTrigger]
ON [dbo].[TriggerSet]
    ([MediaId]);
GO

-- Creating foreign key on [MediaContainerId] in table 'HardwareSet'
ALTER TABLE [dbo].[HardwareSet]
ADD CONSTRAINT [FK_MediaContainerHardware]
    FOREIGN KEY ([MediaContainerId])
    REFERENCES [dbo].[MediaSet_MediaContainer]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_MediaContainerHardware'
CREATE INDEX [IX_FK_MediaContainerHardware]
ON [dbo].[HardwareSet]
    ([MediaContainerId]);
GO

-- Creating foreign key on [ParentWorkgroupId] in table 'WorkgroupSet'
ALTER TABLE [dbo].[WorkgroupSet]
ADD CONSTRAINT [FK_WorkgroupWorkgroup]
    FOREIGN KEY ([ParentWorkgroupId])
    REFERENCES [dbo].[WorkgroupSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkgroupWorkgroup'
CREATE INDEX [IX_FK_WorkgroupWorkgroup]
ON [dbo].[WorkgroupSet]
    ([ParentWorkgroupId]);
GO

-- Creating foreign key on [BandwidthSettings_Id] in table 'WorkgroupSet'
ALTER TABLE [dbo].[WorkgroupSet]
ADD CONSTRAINT [FK_WorkgroupBandwidthSettings]
    FOREIGN KEY ([BandwidthSettings_Id])
    REFERENCES [dbo].[BandwidthSettingsSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkgroupBandwidthSettings'
CREATE INDEX [IX_FK_WorkgroupBandwidthSettings]
ON [dbo].[WorkgroupSet]
    ([BandwidthSettings_Id]);
GO

-- Creating foreign key on [OpeningHours_Id] in table 'WorkgroupSet'
ALTER TABLE [dbo].[WorkgroupSet]
ADD CONSTRAINT [FK_WorkgroupOpeningHours]
    FOREIGN KEY ([OpeningHours_Id])
    REFERENCES [dbo].[OpeningHoursSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkgroupOpeningHours'
CREATE INDEX [IX_FK_WorkgroupOpeningHours]
ON [dbo].[WorkgroupSet]
    ([OpeningHours_Id]);
GO

-- Creating foreign key on [OpeningHours_Id] in table 'HardwareSet'
ALTER TABLE [dbo].[HardwareSet]
ADD CONSTRAINT [FK_HardwareOpeningHours]
    FOREIGN KEY ([OpeningHours_Id])
    REFERENCES [dbo].[OpeningHoursSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_HardwareOpeningHours'
CREATE INDEX [IX_FK_HardwareOpeningHours]
ON [dbo].[HardwareSet]
    ([OpeningHours_Id]);
GO

-- Creating foreign key on [ConnectionSettings_Id] in table 'HardwareSet'
ALTER TABLE [dbo].[HardwareSet]
ADD CONSTRAINT [FK_HardwareConnectionSettings]
    FOREIGN KEY ([ConnectionSettings_Id])
    REFERENCES [dbo].[ConnectionSettingsSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_HardwareConnectionSettings'
CREATE INDEX [IX_FK_HardwareConnectionSettings]
ON [dbo].[HardwareSet]
    ([ConnectionSettings_Id]);
GO

-- Creating foreign key on [BandwidthSettings_Id] in table 'HardwareSet'
ALTER TABLE [dbo].[HardwareSet]
ADD CONSTRAINT [FK_HardwareBandwidthSettings]
    FOREIGN KEY ([BandwidthSettings_Id])
    REFERENCES [dbo].[BandwidthSettingsSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_HardwareBandwidthSettings'
CREATE INDEX [IX_FK_HardwareBandwidthSettings]
ON [dbo].[HardwareSet]
    ([BandwidthSettings_Id]);
GO

-- Creating foreign key on [ConnectionSettings_Id] in table 'WorkgroupSet'
ALTER TABLE [dbo].[WorkgroupSet]
ADD CONSTRAINT [FK_WorkgroupConnectionSettings]
    FOREIGN KEY ([ConnectionSettings_Id])
    REFERENCES [dbo].[ConnectionSettingsSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkgroupConnectionSettings'
CREATE INDEX [IX_FK_WorkgroupConnectionSettings]
ON [dbo].[WorkgroupSet]
    ([ConnectionSettings_Id]);
GO

-- Creating foreign key on [WorkgroupId] in table 'MediaRightSet'
ALTER TABLE [dbo].[MediaRightSet]
ADD CONSTRAINT [FK_WorkgroupMediaRight]
    FOREIGN KEY ([WorkgroupId])
    REFERENCES [dbo].[WorkgroupSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkgroupMediaRight'
CREATE INDEX [IX_FK_WorkgroupMediaRight]
ON [dbo].[MediaRightSet]
    ([WorkgroupId]);
GO

-- Creating foreign key on [Media_Id] in table 'MediaRightSet'
ALTER TABLE [dbo].[MediaRightSet]
ADD CONSTRAINT [FK_MediaRightMedia]
    FOREIGN KEY ([Media_Id])
    REFERENCES [dbo].[MediaSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_MediaRightMedia'
CREATE INDEX [IX_FK_MediaRightMedia]
ON [dbo].[MediaRightSet]
    ([Media_Id]);
GO

-- Creating foreign key on [Group_Id] in table 'GroupWorkgroup'
ALTER TABLE [dbo].[GroupWorkgroup]
ADD CONSTRAINT [FK_GroupWorkgroup_Group]
    FOREIGN KEY ([Group_Id])
    REFERENCES [dbo].[GroupSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Workgroup_Id] in table 'GroupWorkgroup'
ALTER TABLE [dbo].[GroupWorkgroup]
ADD CONSTRAINT [FK_GroupWorkgroup_Workgroup]
    FOREIGN KEY ([Workgroup_Id])
    REFERENCES [dbo].[WorkgroupSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_GroupWorkgroup_Workgroup'
CREATE INDEX [IX_FK_GroupWorkgroup_Workgroup]
ON [dbo].[GroupWorkgroup]
    ([Workgroup_Id]);
GO

-- Creating foreign key on [OwnerWorkgroup_Id] in table 'MediaSet'
ALTER TABLE [dbo].[MediaSet]
ADD CONSTRAINT [FK_WorkgroupMediaOwner]
    FOREIGN KEY ([OwnerWorkgroup_Id])
    REFERENCES [dbo].[WorkgroupSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkgroupMediaOwner'
CREATE INDEX [IX_FK_WorkgroupMediaOwner]
ON [dbo].[MediaSet]
    ([OwnerWorkgroup_Id]);
GO

-- Creating foreign key on [UserId] in table 'UserRightsSet'
ALTER TABLE [dbo].[UserRightsSet]
ADD CONSTRAINT [FK_UserUserRights]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[UserSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_UserUserRights'
CREATE INDEX [IX_FK_UserUserRights]
ON [dbo].[UserRightsSet]
    ([UserId]);
GO

-- Creating foreign key on [Id] in table 'MediaSet_Design'
ALTER TABLE [dbo].[MediaSet_Design]
ADD CONSTRAINT [FK_Design_inherits_Media]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[MediaSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'MediaSet_MediaContainer'
ALTER TABLE [dbo].[MediaSet_MediaContainer]
ADD CONSTRAINT [FK_MediaContainer_inherits_Media]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[MediaSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'MediaSet_ExternalProgram'
ALTER TABLE [dbo].[MediaSet_ExternalProgram]
ADD CONSTRAINT [FK_ExternalProgram_inherits_Media]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[MediaSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'MediaSet_Flash'
ALTER TABLE [dbo].[MediaSet_Flash]
ADD CONSTRAINT [FK_Flash_inherits_Media]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[MediaSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'MediaSet_Image'
ALTER TABLE [dbo].[MediaSet_Image]
ADD CONSTRAINT [FK_Image_inherits_Media]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[MediaSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'MediaSet_Video'
ALTER TABLE [dbo].[MediaSet_Video]
ADD CONSTRAINT [FK_Video_inherits_Media]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[MediaSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'MediaSet_Feed'
ALTER TABLE [dbo].[MediaSet_Feed]
ADD CONSTRAINT [FK_Feed_inherits_Media]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[MediaSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'MediaSet_Text'
ALTER TABLE [dbo].[MediaSet_Text]
ADD CONSTRAINT [FK_Text_inherits_Media]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[MediaSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'MediaSet_Url'
ALTER TABLE [dbo].[MediaSet_Url]
ADD CONSTRAINT [FK_Url_inherits_Media]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[MediaSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'TriggerSet_Planning'
ALTER TABLE [dbo].[TriggerSet_Planning]
ADD CONSTRAINT [FK_Planning_inherits_Trigger]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[TriggerSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'TriggerSet_KeyboardEvent'
ALTER TABLE [dbo].[TriggerSet_KeyboardEvent]
ADD CONSTRAINT [FK_KeyboardEvent_inherits_Trigger]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[TriggerSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'TriggerSet_TimerEvent'
ALTER TABLE [dbo].[TriggerSet_TimerEvent]
ADD CONSTRAINT [FK_TimerEvent_inherits_Trigger]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[TriggerSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'TriggerSet_MouseEvent'
ALTER TABLE [dbo].[TriggerSet_MouseEvent]
ADD CONSTRAINT [FK_MouseEvent_inherits_Trigger]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[TriggerSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'TriggerSet_UsbEvent'
ALTER TABLE [dbo].[TriggerSet_UsbEvent]
ADD CONSTRAINT [FK_UsbEvent_inherits_Trigger]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[TriggerSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'TriggerSet_NetworkEvent'
ALTER TABLE [dbo].[TriggerSet_NetworkEvent]
ADD CONSTRAINT [FK_NetworkEvent_inherits_Trigger]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[TriggerSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'MediaSet_Streaming'
ALTER TABLE [dbo].[MediaSet_Streaming]
ADD CONSTRAINT [FK_Streaming_inherits_Media]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[MediaSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------