using DataLayer.Domain.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class ExportManager
    {
        private IList<IPersonModel> data {get;set; }
       
        public ExportManager(IList<IPersonModel> persons)
        {
            data = persons;
        }

        public Dictionary<string, int> NameByFrequency()
        {
            //var filterData = (from item in data.GroupBy(p => p.FirstName).Join(data.GroupBy( p => p.LastName)) select new { item. }).GroupBy(p=>p.FirstName).GroupBy(p=>p.;
            var filterData = (from item in data.GroupBy(p => p.FirstName)  select new { Name= item.Key, Frequency =item.Count() }).ToDictionary(p=>p.Name,p=>p.Frequency);

            return filterData;
        }

        public Dictionary<string, int> AddressByFrequency( )
        {
            var filterData = (from item in data.GroupBy(p => p.FirstName) select new { Name = item.Key, Frequency = item.Count() }).ToDictionary(p => p.Name, p => p.Frequency);

            return filterData;
        }

    }
}