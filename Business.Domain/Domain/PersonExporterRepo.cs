using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using DataLayer.Domain.Domain;
using DataLayer.Domain.Repository;

namespace Business.Domain.Domain
{
    public class PersonExporterRepo
    {
        private IList<IPersonModel> data {get;set; }
        private PersonRepo PersonSvc { get; set; }
        
        public PersonExporterRepo()
        {
            PersonSvc = new PersonRepo();

            data = (IList<IPersonModel>) PersonSvc.GetData();
        }

        public Dictionary<string, int> NameByFrequency()
        {
            var filter= (from item in data select new { FullName= item.FirstName + " " + item.LastName });
            var strArr= String.Join(" ", filter.Select(p => p.FullName).ToArray()).Split(' ').OrderBy(p=>p.ToString());
            var filterData = (from item in strArr.GroupBy(p=>p.ToString())
                               orderby item.Count() descending
                               select new { Name = item.Key, Frequency = item.Count() }).ToDictionary(p => p.Name, p => p.Frequency);
          return filterData;
        }
        public Dictionary<string, int> OrderByAddress( )
        {
            var _data = (from item in data select new { Addresss = item.Address });
            var strArr = _data.Select(p => p.Addresss).ToArray().ToList();
            var filterData = (from item in strArr.GroupBy(p => p.ToString())
                              orderby Regex.Replace(item.Key, @"[\d-]", string.Empty)
                              select new { Name = item.Key, Frequency = item.Count() })
                               .ToDictionary(p => p.Name, p => p.Frequency);
        
            return filterData;
        }
    }
}