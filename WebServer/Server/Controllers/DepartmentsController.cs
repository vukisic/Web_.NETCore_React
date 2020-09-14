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
    public class DepartmentsController : ControllerBase
    {
        private IDepartmentRepository _repo;
        public DepartmentsController(IDepartmentRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _repo.GetAll();
            return Ok(result);
        }

        [HttpGet]
        [Route("single/{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var result = await _repo.Get(id);
            if (result == null)
                return BadRequest("Department doesn't exist!");
            return Ok(result);
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Add(DepartmentModel model)
        {
            Department department = new Department() { MainLocation = model.MainLocation, Name = model.Name };
            var result = await _repo.Add(department);
            if (result)
                return Ok("Success!");
            return BadRequest("Department alredy exist!");
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var result = await _repo.Delete(id);
            if (result)
                return Ok("Success!");
            return BadRequest("Department doesn't exist!");
        }

        [HttpPost]
        [Route("update")]
        public async Task<IActionResult> Update(DepartmentModel model)
        {
            var department = await _repo.Get(model.Id);
            if (department == null)
                return BadRequest("Department doesn't exist!");
            department.MainLocation = model.MainLocation;
            department.Name = model.Name;
            var result = await _repo.Update(department.Id, department);
            if (result)
                return Ok("Success!");
            return BadRequest("Failed to update department!");

        }
    }
}
