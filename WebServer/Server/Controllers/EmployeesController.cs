using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Models.DTO;
using Server.Providers;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private IEmployeeRepository _employeeRepo;
        private IDepartmentRepository _departmentRepo;
        public EmployeesController(IEmployeeRepository employeeRepo, IDepartmentRepository departmentRepo)
        {
            _employeeRepo = employeeRepo;
            _departmentRepo = departmentRepo;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _employeeRepo.GetAll();
            return Ok(result);
        }

        [HttpGet]
        [Route("single/{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var result = await _employeeRepo.Get(id);
            if (result == null)
                return BadRequest("Employee doesn't exist!");
            return Ok(result);
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Add(EmployeeModel model)
        {
            var department = await _departmentRepo.GetByName(model.Department);
            if (department != null)
            {
                Employee employee = new Employee()
                {
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Department = department
                };

                var result = await _employeeRepo.Add(employee);
                if (result)
                    return Ok("Success!");
                return BadRequest("Employee alredy exist!");
            }
            return BadRequest("Department doesn't exist!");
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var result = await _employeeRepo.Delete(id);
            if(result)
                return Ok("Success!");
            return BadRequest("Employee doesn't exist!");
        }

        [HttpPost]
        [Route("update")]
        public async Task<IActionResult> Update(EmployeeModel model)
        {
            var employee = await _employeeRepo.Get(model.Id);
            if (employee == null)
                return BadRequest("Employee doesn't exist!");
            employee.Email = model.Email;
            employee.FirstName = model.FirstName;
            employee.LastName = model.LastName;
            if (employee.Department.Name == model.Department)
            {
                var result = await _employeeRepo.Update(model.Id, employee);
                if (result)
                    return Ok("Success!");
                return BadRequest("Failed to update Employee!");
            }
            else
            {
                var department = await _departmentRepo.GetByName(model.Department);
                if (department != null)
                {
                    employee.Department = department;
                    var result = await _employeeRepo.Update(employee.Id, employee);
                    if (result)
                        return Ok("Success!");
                    return BadRequest("Failed to update Employee!");
                }
                return BadRequest("Department doesn't exist!");
            }
        }


    }
}
