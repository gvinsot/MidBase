using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
using System.Text;
using Entity;
using Managers;
using fastJSON;

namespace Tester
{
    class Program
    {
        static void Main(string[] args)
        {
            using (DataModelContainer model = new DataModelContainer())
            {
                Workgroup wg = new Workgroup()
                    {
                        Name = "WG Test"
                    };

                Video video1 = new Video();
                video1.Name = "Test";
                video1.Volume = 50;
                video1.Duration = TimeSpan.FromMinutes(1.65465464);
                video1.Trigger.Add(new Planning()
                    {
                        StartDate = new DateTime(2000,12,31),
                        EndDate = new DateTime(2200, 12, 31),
                        IsOnMonday = true,
                        IsOnTuesday = true,
                        IsOnWednesday = true,
                        IsOnThursday = true,
                        IsOnFriday = true,
                        IsOnSunday = true,
                        DayStartTime = TimeSpan.FromSeconds(0),
                        DayEndTime = TimeSpan.FromHours(23.99),
                    });
                video1.OwnerWorkgroup = wg;
                video1.File = new File()
                    {
                        Path = @"d:\toto1\"
                    };
                model.AddToMediaSet(video1);

                model.SaveChanges(SaveOptions.AcceptAllChangesAfterSave);
            } 


            var result = MediaManager.GetMedias();

        }
    }
}
