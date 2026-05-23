export default function() {
    return(
        <div className="settings-page">
            <h1>Settings</h1>
            <div className="settings-card">
                <div className="form-group">
                    <label>
                        Currency
                    </label>
                    <select>
                        <option>
                            USD
                        </option>
                        <option>
                            INR
                        </option>

                    </select>
                </div>
                <div className="form-group">
                    <label>Theme</label>
                    <select>
                        <option>
                            Light
                        </option>
                        <option>
                            Dark
                        </option>
                    </select>
                </div>
                <button className="primary-btn">Save Changes</button>
            </div>
        </div>
    )
}