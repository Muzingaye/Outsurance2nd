using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using CsvHelper;
using DataLayer.Domain.Domain;
using DataLayer.Domain.Interface;

namespace DataLayer.Domain.Repository
{
    public class PersonRepo : IRepo
    {
        private IRepo _repo;

        public PersonRepo(IRepo repo)
        {
            this._repo = repo;
        }

        public PersonRepo()
        {

        }
        public void Test()
        {
            Console.WriteLine("Hi");
        }
        public bool TestConnection()
        {
            try
            {
                var filePath = Convert.ToString(ConfigurationManager.AppSettings["SourceDirectory"]);

                var b = File.Exists(filePath) ? true : false;
                return b;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public List<IPersonModel> GetData()
        {
            List<IPersonModel> personList = new List<IPersonModel>();

            var filePath = Convert.ToString(ConfigurationManager.AppSettings["SourceDirectory"]);

            var csv = new CsvReader(new StreamReader(filePath));
            var PersonList = csv.GetRecords<PersonModel>();

            foreach (var person in PersonList)
            {
                var _personDisplay = new PersonModel(person);
                personList.Add(_personDisplay);
            }
           

            return personList;
        }
    }
}
