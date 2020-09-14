using Microsoft.EntityFrameworkCore;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace Server.Providers
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private AppDbContext _context;

        public DepartmentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Add(Department model)
        {
            var result = await _context.Departments.SingleOrDefaultAsync(x => x.Name.ToLower() == model.Name.ToLower());
            if (result != null)
                return false;
            _context.Departments.Add(model);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(long id)
        {
            
            var result = await Get(id);
            if (result == null)
                return false;
            var employees = _context.Employees.Include(x=>x.Department).Where(x => x.Department.Id == id).ToList();
            if(employees.Count > 0)
            {
                foreach (var item in employees)
                {
                    _context.Employees.Remove(item);
                }
            }
            _context.Departments.Remove(result);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Department> Get(long id)
        {
            return await _context.Departments.SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Department>> GetAll()
        {
            return await _context.Departments.ToListAsync();
        }

        public async Task<Department> GetByName(string name)
        {
            return await _context.Departments.SingleOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        }

        public async Task<int> GetCount(string name)
        {
            var result = await GetByName(name);
            if (result == null)
                return -1;
            return _context.Employees.Where(x => x.Department.Name.ToLower() == name.ToLower()).Count();

        }

        public async Task<bool> Update(long id, Department model)
        {
            var result = await Get(id);
            if (result == null)
                return false;
            var sameName = await GetByName(model.Name);
            if (sameName != null)
                return false;
            _context.Entry(model).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
