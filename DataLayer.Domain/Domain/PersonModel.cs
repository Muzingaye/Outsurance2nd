namespace DataLayer.Domain.Domain
{
    public interface IPersonModel
    {
        string Address { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        string PhoneNumber { get; set; }
    }

    public class PersonModel : IPersonModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }


        public PersonModel()
        {
        }

        public PersonModel(PersonModel _person)
        {
            FirstName = _person.FirstName;
            LastName = _person.LastName;
            Address = _person.Address;
            PhoneNumber = _person.PhoneNumber;
        }
    }
   
}
