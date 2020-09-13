using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Providers
{
    public interface IRepository<T>
    {
        Task<bool> Add(T model);
        Task<T> Get(long id);
        Task<List<T>> GetAll();
        Task<bool> Update(long id, T model);
        Task<bool> Delete(long id);
    }
}
