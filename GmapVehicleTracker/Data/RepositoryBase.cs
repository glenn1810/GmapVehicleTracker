using GmapVehicleTracker.Data.Contract;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GmapVehicleTracker.Data
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected ApplicationDbContext ApplicationDbContext { get; set; }
        public RepositoryBase(ApplicationDbContext applicationDbContext)
        {
            this.ApplicationDbContext = applicationDbContext;
        }

        public IQueryable<T> FindAll()
        {
            return this.ApplicationDbContext.Set<T>().AsNoTracking();
        }
        public void Create(T entity)
        {
            this.ApplicationDbContext.Set<T>().Add(entity);
        }
        public void Update(T entity)
        {
            this.ApplicationDbContext.Set<T>().Update(entity);
        }
        public void Delete(T entity)
        {
            this.ApplicationDbContext.Set<T>().Remove(entity);
        }
    }
}
