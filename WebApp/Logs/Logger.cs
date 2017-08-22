using System;
using System.Configuration;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Business.Domain.Domain;
using NLog.Fluent;

namespace WebApp.Logs
{
    public static class Logger
    {
        private static readonly string LogPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "ActivityLog\\");

        public static void WriteActivityLog(string MessageList, string WriteTo)
        {
            try
            {
                if (!String.IsNullOrEmpty(LogPath))
                {
                    if (!Directory.Exists(LogPath))
                        Directory.CreateDirectory(LogPath);
                    var fileName = LogPath + WriteTo;
                    if (!File.Exists(fileName))
                    {
                        var myFile = File.Create(fileName);
                        myFile.Close();
                    }
                        

                    using (StreamWriter file = new StreamWriter(fileName, true))
                    {
                        file.WriteLine(MessageList);
                    }
                }
            }
            catch (Exception ex)
            {
                Error.LogFileLogger.Error(ex.Message);}
        }
    }
}