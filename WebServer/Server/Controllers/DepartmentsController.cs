using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        //[HttpGet]
        //[Route("all")]
        //public async Task<IActionResult> GetAll()
        //{
        //    throw new Exception();
        //}
    }
}
