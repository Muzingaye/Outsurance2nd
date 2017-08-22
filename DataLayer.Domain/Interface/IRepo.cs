using System.Collections.Generic;
using DataLayer.Domain.Domain;

namespace DataLayer.Domain.Interface
{
    public interface IRepo
    {
        void Test();
        bool TestConnection();
        List<IPersonModel> GetData();
    } 
}
