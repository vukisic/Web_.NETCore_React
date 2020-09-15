using Microsoft.EntityFrameworkCore;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace Server.Providers
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private AppDbContext _context;

        public EmployeeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Add(Employee model)
        {
            var result = await _context.Employees.SingleOrDefaultAsync(x => x.Email == model.Email);
            if (result != null)
                return false;
            _context.Employees.Add(model);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(long id)
        {
            var result = await Get(id);
            if (result == null)
                return false;
            _context.Employees.Remove(result);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Employee> Get(long id)
        {
            return await _context.Employees.Include(x=>x.Department).SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Employee>> GetAll()
        {
            return await _context.Employees.Include(x => x.Department).ToListAsync();
        }

        public async Task<Department> GetDepartment(long id)
        {
            var result = await Get(id);
            return result == null ? null : result.Department;
        }

        public async Task<bool> Update(long id, Employee model)
        {
            var result = await Get(id);
            if (result == null)
                return false;
            _context.Entry(model).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
