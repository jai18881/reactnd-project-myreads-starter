import React, {Component} from 'react';

class BookShelfChanger extends Component {
    state = {
        options: [
            {
                name: 'Move to...',
                value: 'move',
                disabled: true,
            },
            {
                name: 'Currently Reading',
                value: 'currentlyReading',
                disabled: false,
            },
            {
                name: 'Want to Read',
                value: 'wantToRead',
                disabled: false,
            },
            {
                name: 'Read',
                value: 'read',
                disabled: false,
            },
            {
                name: 'None',
                value: 'none',
                disabled: false,
            }
        ],
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select
                    value={this.props.shelfValue}
                    onChange={this.props.onChange}>

                    {this.state.options.map(option => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                            {option.name}
                            </option>
                    ))}
                </select>
            </div>
        )
    }
}

export default BookShelfChanger;