import React from "react";
import Select from "./Fields/Select";
import Radio from "./Fields/Radio";
import { resetSelectOnRadio } from "./utils/formUtils";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);

    const INPUT_NAMES = {
      SELECT1: "select1",
      SELECT2: "select2",
      RADIO: "selectGroup",
    };

    this.state = {
      currencies: [],
      inputNames: INPUT_NAMES,
      [INPUT_NAMES.SELECT1]: null,
      [INPUT_NAMES.SELECT2]: null,
      [INPUT_NAMES.RADIO]: null,
    };
  }

  handleChange = (event) => {
    const { inputNames } = this.state;

    // the following function can be called to reset any select
    // do NOT forget to also add it to setState as below
    const select2ResetIfNeeded = resetSelectOnRadio(
      event,
      inputNames.SELECT2,
      this.state[inputNames.SELECT2],
      inputNames.RADIO,
      "v2"
    );

    const { name, value } = event.target;

    // if you forget to do this part, nothing will happen
    this.setState({
      [name]: value,
      [inputNames.SELECT2]: select2ResetIfNeeded,
    });
  };

  fetchCurrencies = async (from, to) => {
    const res = await axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`
    );
    return res.data;
  };

  fetchCountries = async () => {
    const res = await axios.get("https://restcountries.eu/rest/v2/all");
    return res.data;
  };

  componentDidMount = async () => {
    const countries = await this.fetchCountries();
    const newArray = countries.map(async (c) => {
      var insideArray = await Promise.all(
        c.currencies.map(async (cur) => {
          const from =
            cur.code && cur.code !== "(none)" ? cur.code.toLowerCase() : null;
          if (!from) return null;
          const eur = await this.fetchCurrencies(from, "eur");
          return eur.eur;
        })
      ).catch(() => {
        return null;
      });
      let newObj = { ...c, currencies: insideArray };
      return newObj;
    });
    await Promise.all(newArray).then((a) => {
      console.log(a);
      this.setState({ currencies: a });
    });
  };

  render() {
    const { inputNames } = this.state;

    return (
      <div className="App">
        <form>
          <h1>Dummy form</h1>
          <div className="form-group">
            <Radio name={inputNames.RADIO} handleChange={this.handleChange} />
            <Select
              name={inputNames.SELECT1}
              handleChange={this.handleChange}
              selectedValue={this.state[inputNames.SELECT1]}
            />
            <Select
              name={inputNames.SELECT2}
              handleChange={this.handleChange}
              selectedValue={this.state[inputNames.SELECT2]}
            />
          </div>
        </form>
        <div>
          {this.state.currencies &&
            this.state.currencies.map((cu) => {
              return (
                <div>
                  <div>{cu.name}</div>
                  <div>
                    {cu.currencies &&
                      cu.currencies.map((ci) => (
                        <>
                          <span>eur:</span>
                          <span>{ci}</span>
                        </>
                      ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Form;
