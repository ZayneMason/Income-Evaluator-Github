using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class State
    {
        public string StateAbbreviation { get; private set; }
        public byte AGISize { get; private set; }
        public double NumberOfIndividuals { get; private set; }
        public double AdjustedGrossIncome { get; private set; }

        public State() { }

        public State(
            string state,
            byte agiSize,
            double numberOfIndividuals,
            double adjustedGrossIncome
        )
        {
            StateAbbreviation = state;
            AGISize = agiSize;
            NumberOfIndividuals = numberOfIndividuals;
            AdjustedGrossIncome = adjustedGrossIncome;
        }

    }
}
