using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GmapVehicleTracker.Data.Contract
{
    public interface IRepositoryBase<T>
    {
        IQueryable<T> FindAll();
        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
