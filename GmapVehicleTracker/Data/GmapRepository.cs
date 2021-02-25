using GmapVehicleTracker.Data.Contract;
using GmapVehicleTracker.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace GmapVehicleTracker.Data
{
    public class GmapRepository : RepositoryBase<VehicleRouteTracker>, IGmapRepository
    {
        private readonly ApplicationDbContext _context;
        public GmapRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public void AddNewRouteTracker(VehicleRouteTracker camp)
        {
            _context.VehicleRouteTrackers.Add(camp);
        }

        public void DeleteRouteTracker(VehicleRouteTracker camp)
        {
            _context.VehicleRouteTrackers.Remove(camp);
        }

        public IEnumerable<VehicleRouteTracker> GetAllVehicleRoute()
        {
            var query = _context.VehicleRouteTrackers.ToList();

            return query;
        }
    }
}
