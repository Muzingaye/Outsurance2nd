using Business.Domain.Domain;
using DataLayer.Domain.Repository;
using NUnit.Framework;
using System.Linq;

namespace Business.Domain.Test
{
    
    [TestFixture]   
    public class PersonsTest
    {
        [Test]
        public void CanInstatiateClass()
        {
            Assert.That(new Person(), Is.Not.Null);
        }
        
        [Test]
        public void getNameByFrequency()
        {
            var repo = new Person(new PersonRepo());
            var data = repo.PersonsLists();
            Assert.IsTrue(data != null && data.Any());
        }


       
    }


}
