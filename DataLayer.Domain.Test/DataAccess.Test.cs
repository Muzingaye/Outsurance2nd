using System;
using System.Collections.Generic;
using NUnit.Framework;
using Rhino.Mocks;
using DataLayer.Domain.Domain;
using DataLayer.Domain.Interface;
using DataLayer.Domain.Repository;

namespace DataLayer.Domain.Test
{
    [TestFixture]
    internal class DataAccess
    {
        private IRepo repo;

        [SetUp]
        public void Init()
        {
            repo = new PersonRepo();
        }

        [Test]
        public void CanInstatiateClass()
        {
           Assert.That(repo, Is.Not.Null);
        }


        [Test]
        public void CheckIfWhenWrongMethodCalled()
        {
            var sturbRepo = MockRepository.GenerateMock<IRepo>();
            var controll = new PersonRepo(sturbRepo);
            sturbRepo.Expect(m => m.TestConnection());
            controll.Test();
            sturbRepo.Stub(x => x.TestConnection()).Throw(new ArgumentException("IRepo.TestConnection(); Expected #1, Actual #0"));
            new PersonRepo().Test();
        }

        [Test]
        public void ProcessFile_ThrowsFileNotFoundException()
        {
            try
            {
                var target = MockRepository.GenerateMock<IRepo>();
                target.Expect(x => x.Test()).Throw(new System.IO.FileNotFoundException());
                target.TestConnection();
                //target.VerifyAllExpectations();
            }
            catch (Exception e)
            {
                Assert.Fail(e.Message);
            }
        }

        [Test]
        public void CheckIfCorrectMethodCalled()
        {
            var sturbRepo = MockRepository.GenerateMock<IRepo>();
            var controll = new PersonRepo(sturbRepo);
            sturbRepo.Expect(m => m.TestConnection());
            controll.TestConnection();
        }

        [Test]
        public void CheckIfFilePathExists()
        {
            var target = MockRepository.GenerateMock<IRepo>();
            target.Expect(x => x.TestConnection()).Return(true);
            target.VerifyAllExpectations();
        }

        [Test]
        public void ProcessTest_DataAvailableReturnFalse()
        {
            List<IPersonModel> expectedlist = new List<IPersonModel>();
            var mockview = MockRepository.GenerateMock<IRepo>();
            mockview.Expect(view => view.GetData()).Throw(new ArgumentException("Rhino.Mocks.Exceptions.ExpectationViolationException")); ///.Return(expectedlist);
        }

        [Test]
        public void ProcessTest_DataAvailableReturnTrue()
        {
            List<IPersonModel> expectedlist = new List<IPersonModel>();
            var mockview = MockRepository.GenerateMock<IRepo>();
            mockview.Expect(view => view.GetData()).Return(expectedlist); //Mock for the property getter
            //mockview.VerifyAllExpectations();
        }

        [Test]
        public void ProcessTest_GetAll()
        {
            var repo = new PersonRepo();
            var data = repo.GetData();
            Assert.IsTrue(data.Count > 0);
        }
    }
}
