using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Providers
{
    public interface IDepartmentRepository : IRepository<Department>
    {
        Department GetByName(string name);
        int GetCount(string name);
    }
}
