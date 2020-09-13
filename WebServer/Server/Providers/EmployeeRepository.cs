using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Providers
{
    public class EmployeeRepository : IEmployeeRepository
    {
        public bool Add(Employee model)
        {
            throw new NotImplementedException();
        }

        public bool Delete(long id)
        {
            throw new NotImplementedException();
        }

        public Employee Get(long id)
        {
            throw new NotImplementedException();
        }

        public Department GetDepartment(long id)
        {
            throw new NotImplementedException();
        }

        public bool Update(long id, Employee model)
        {
            throw new NotImplementedException();
        }
    }
}
