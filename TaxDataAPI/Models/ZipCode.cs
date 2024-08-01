namespace WebAPI.Models
{
    public class ZipCode
    {
        public int Zip { get; private set; }
        public string State { get; private set; }
        public byte AGISize { get; private set; }
        public double NumberOfIndividuals { get; private set; }
        public double AdjustedGrossIncome { get; private set; }

        public ZipCode() { }

        public ZipCode(
            int zip,
            string state,
            byte agiSize,
            double numberOfIndividuals,
            double adjustedGrossIncome
        )
        {
            Zip = zip;
            State = state;
            AGISize = agiSize;
            NumberOfIndividuals = numberOfIndividuals;
            AdjustedGrossIncome = adjustedGrossIncome;
        }
    }
}
