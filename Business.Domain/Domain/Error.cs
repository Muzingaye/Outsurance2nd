using System;
using NLog;

namespace Business.Domain.Domain
{
    public static class Error
    {
        public static Logger LogFileLogger = LogManager.GetCurrentClassLogger();
        public static Logger LogMailLogger = LogManager.GetLogger("MailAlert");

        public static bool DbLoggerError(string parameters, Exception capturedError)
        {
            bool Out = true;
            LogFileLogger?.Error(capturedError, parameters);
            return Out;
        }
}
}
