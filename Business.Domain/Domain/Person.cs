using System;
using System.Collections.Generic;
using DataLayer.Domain.Domain;
using DataLayer.Domain.Repository;

namespace Business.Domain.Domain
{
   
    public class Person
    {
        private IList<IPersonModel> data { get; set; }

        private PersonRepo _repo;
        public Person(PersonRepo repo)
        {
            this._repo = repo;
        }
        public Person()
        {
            
        }
        public List<IPersonModel> PersonsLists()
        {
            List<IPersonModel> model = new List<IPersonModel>();
            try
            {
               model = _repo.GetData();
            }
            catch (Exception ex)
            {
                Error.LogFileLogger.Error(ex.Message);
                Error.DbLoggerError("WARNING Function - PersonsLists :", ex);
            }
            return model;
        }


       

    }


    
}
