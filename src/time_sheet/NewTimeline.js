import { api, memory } from './configure/env'



const NewTimeline = () => {
    if (memory.get_token === null) { window.location.href = "/signin" }
    else {
        return (
            <div class="row g-3">
                <h1>New timeline</h1>
                <hr />
                <div class="col-md-4">
                    <label for="inputDate4" class="form-label">Date</label>
                    <input type="date" class="form-control" id="inputDate4" />
                </div>

                <div class="col-md-8">
                    <label for="inputPassword4" class="form-label">Name of client</label>
                    <input
                        type="text"
                        list="ClientType"
                        className="form-control"
                        aria-describedby="NameOfMonthHelp"
                        id="inputClientType4"
                    //defaultValue={dates.get_month}
                    //onChange={(e) => { setOpenSales({ ...getOpenSales, Month: e.target.value }) }}
                    />
                    <datalist id="ClientType">
                        <option>...</option>)
                    </datalist>

                </div>
                <div class="col-md-8">
                    <label for="inputPassword4" class="form-label">Name of agency</label>
                    <input
                        type="text"
                        list="ClientType"
                        class="form-control"
                        aria-describedby="NameOfMonthHelp"
                        id="inputClientType4"
                    //defaultValue={dates.get_month}
                    //onChange={(e) => { setOpenSales({ ...getOpenSales, Month: e.target.value }) }}
                    />
                    <datalist id="ClientType">
                        <option>...</option>)
                    </datalist>
                </div>

                <div class="col-md-4">
                    <label for="inputPassword4" class="form-label">Name of client type</label>
                    <input
                        type="text"
                        list="ClientType"
                        class="form-control"
                        aria-describedby="NameOfMonthHelp"
                        id="inputClientType4"
                    //defaultValue={dates.get_month}
                    //onChange={(e) => { setOpenSales({ ...getOpenSales, Month: e.target.value }) }}
                    />
                    <datalist id="ClientType">
                        <option>...</option>)
                    </datalist>
                </div>
                <div></div><div></div>
                <div class="row mb-3 offset-sm-1" >
                    <div class=" col-md-4 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">call</label>
                    </div>

                    <div class=" col-md-4 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">visit AM</label>
                    </div>

                    <div class=" col-md-4 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">visit PM</label>
                    </div>
                    <div class=" col-md-4 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">site tour AM</label>
                    </div>

                    <div class=" col-md-4 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">site tour PM</label>
                    </div>

                    <div class=" col-md-4 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">lunch</label>
                    </div>
                    <div class=" col-md-4 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">dinner</label>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="validationTextarea" class="form-label">Other</label>
                    <textarea class="form-control" id="validationTextarea" placeholder="note example textarea" ></textarea>
                    <div class="invalid-feedback">
                        Please enter a message in the textarea.
                    </div>
                </div>

                <div className="col-mb-3">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        )
    }
}

export default NewTimeline