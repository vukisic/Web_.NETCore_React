using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Providers
{
    public interface IDepartmentRepository : IRepository<Department>
    {
        Task<Department> GetByName(string name);
        Task<int> GetCount(string name);
    }
}
