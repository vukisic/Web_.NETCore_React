using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Providers
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        Task<Department> GetDepartment(long id);
    }
}
