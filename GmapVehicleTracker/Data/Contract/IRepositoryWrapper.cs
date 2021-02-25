using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GmapVehicleTracker.Data.Contract
{
    public interface IRepositoryWrapper
    {
        IGmapRepository Gmap { get; }
        void Save();
    }
}
