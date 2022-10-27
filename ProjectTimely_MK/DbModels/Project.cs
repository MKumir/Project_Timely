using System;
using System.Collections.Generic;

#nullable disable

namespace ProjectTimely_MK.DbModels
{
    public partial class Project
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string StartDate { get; set; }
        public string StopDate { get; set; }
        public string Duration { get; set; }
    }
}
