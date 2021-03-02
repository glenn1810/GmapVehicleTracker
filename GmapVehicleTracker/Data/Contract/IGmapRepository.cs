using GmapVehicleTracker.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GmapVehicleTracker.Data.Contract
{
    public interface IGmapRepository: IRepositoryBase<VehicleRouteTracker>
    {
        void AddNewRouteTracker(VehicleRouteTracker camp);

        void DeleteRouteTracker(VehicleRouteTracker camp);
        IEnumerable<VehicleRouteTracker> GetAllVehicleRoute();

        IEnumerable<WayPoints> GetWayPoints();
    }
}
