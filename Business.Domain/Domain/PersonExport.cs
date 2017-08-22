using System;
using System.Collections.Generic;

namespace Business.Domain.Domain
{
    public class PersonExport
    {
        private IList<PersonExporterRepo> data { get; set; }

        private PersonExporterRepo _repo;
        public PersonExport()
        {
            
        }

        public PersonExport(PersonExporterRepo repo)
        {
            this._repo = repo;
        }
        public Dictionary<string, int> NameByFrequency()
        {
            var model = new Dictionary<string, int>();
            try
            {
                model = _repo.NameByFrequency();
            }
            catch (Exception ex)
            {
                Error.LogFileLogger.Error(ex.Message);
                Error.DbLoggerError("WARNING Function - NameByFrequency :", ex);
            }
            return model;
        }


        public Dictionary<string, int> OrderByAddress()
        {
            var model = new Dictionary<string, int>();
            try
            {
                model = _repo.OrderByAddress();
            }
            catch (Exception ex)
            {
                Error.LogFileLogger.Error(ex.Message);
                Error.DbLoggerError("WARNING Function - OrderByAddress :", ex);
            }
            return model;
        }

    }
}
