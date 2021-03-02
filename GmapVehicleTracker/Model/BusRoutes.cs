using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GmapVehicleTracker.Model
{
    public class BusRoutes
    {
        public string CompanyName { get; set; }

        public string BusName { get; set; }

        public LatLong Origin { get; set; }

        public LatLong Destination { get; set; }

        public List<LatLong> WayPoints { get; set; }

        public decimal Revenue { get; set; }
    }
}
