using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Providers
{
    public interface IRepository<T>
    {
        bool Add(T model);
        T Get(long id);
        bool Update(long id, T model);
        bool Delete(long id);
    }
}
