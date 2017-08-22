using System.Linq;
using Business.Domain.Domain;
using NUnit.Framework;

namespace Business.Domain.Test
{
    [TestFixture]
    public class ExportDataTest
    {
        [Test]
        public void CanInstatiateClass()
        {
            Assert.That(new PersonExporterRepo(), Is.Not.Null);
        }

        [Test]
        public void returnNameFreOutPut()
        {
            var repo = new PersonExport(new PersonExporterRepo());
            var data = repo.NameByFrequency();
            Assert.IsTrue(data != null && data.Any());
        }

        [Test]
        public void returnAddress()
        {
            var repo = new PersonExport(new PersonExporterRepo());
            var data = repo.OrderByAddress();
            Assert.IsTrue(data != null && data.Any());
        }
    }
}
