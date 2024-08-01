using Microsoft.Extensions.Configuration.UserSecrets;
using System.ComponentModel.DataAnnotations;
using System.IO.Compression;

namespace UserAPI.Models
{
    public class Person
    {
        public int UserID { get; set; }
        public int PersonID { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string ZipCode { get; set; }
        public double Income { get; set; }
        public Person() { }

        public Person(
            int userID,
            string firstName,
            string lastName,
            string zipCode,
            double income
            )
        {
            UserID = userID;
            FirstName = firstName;
            LastName = lastName;
            ZipCode = zipCode;
            Income = income;
        }
    }
}
