using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class BaseUser : IdentityUser
    {
        // Email,PhoneNumber, EmailComfirmed already exist in IdentityUser
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public string ActivationCode { get; set; }
    }
}
