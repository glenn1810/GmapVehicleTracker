using GmapVehicleTracker.Data.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GmapVehicleTracker.Data
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private ApplicationDbContext _context;
        private IGmapRepository _gmap;

        public IGmapRepository Gmap
        {
            get
            {
                if (_gmap == null)
                {
                    _gmap = new GmapRepository(_context);
                }
                return _gmap;
            }
        }

        public RepositoryWrapper(ApplicationDbContext context)
        {
            _context = context;
        }
        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
