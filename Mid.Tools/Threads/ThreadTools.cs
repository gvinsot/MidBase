using System;
using System.Data;
using System.Threading;

namespace Mid.Tools
{
    public static class ThreadTools
    {
        public static Thread StartNewTread(string threadName, ThreadStart method, bool isBackground=false)
        {
            var thread = new Thread(method);
            thread.IsBackground = isBackground;
            thread.Name = threadName;
            thread.Start();
            return thread;
        }


        public delegate void MethodToTry();

        public static void DelayMethod(TimeSpan startTime, MethodToTry methodToDo)
        {
            var timer = new System.Timers.Timer(startTime.TotalMilliseconds);
            timer.Elapsed += delegate
            {
                timer.Stop();
                try
                {
                    methodToDo();
                }
                catch (Exception ex)
                {
                    //TraceManager.Instance.WriteError(ex);
                }
            };
            timer.Start();
        }

        public static void TryMethodManyTimes(int maxTry, TimeSpan sleepBetweenTries,MethodToTry methodToTry)
        {
            bool hasSucceeded = false;
            int nbTry = 0;
            do
            {
                try
                {
                    methodToTry();
                    hasSucceeded = true;
                }
                catch (Exception ex)
                {
                    hasSucceeded = false;

                    if (nbTry >= maxTry-1)
                    {
                        throw ex;
                    }

                    Thread.Sleep(sleepBetweenTries);
                }
                finally
                {
                    nbTry++;
                }
            }
            while (nbTry < maxTry && hasSucceeded == false);
        }


        public static void TryDBMethodManyTimes(int maxTry, TimeSpan sleepBetweenTries, MethodToTry methodToTry)
        {
            bool hasSucceeded = false;
            int nbTry = 0;
            do
            {
                try
                {
                    methodToTry();
                    hasSucceeded = true;
                }
                catch (OptimisticConcurrencyException ex)
                {
                    hasSucceeded = false;

                    if (nbTry >= maxTry - 1)
                    {
                        throw ex;
                    }

                    Thread.Sleep(sleepBetweenTries);
                }
                finally
                {
                    nbTry++;
                }
            }
            while (nbTry < maxTry && hasSucceeded == false);
        }
    }
}
