import React from 'react';
import './QuotesGenerator.css';
import Button from '@material-ui/core/Button';
//import { MDBIcon, MDBBtn } from 'mdbreact';
var QuoteObj = [];

class QuotesGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Quote: 'Quotes Will be shown here.',
            Author: 'Author\'s name will be shown here'
        }
        this.randomQuote = this.randomQuote.bind(this);
    }

    componentDidMount() {
        fetch("https://type.fit/api/quotes")
            .then(response =>
                response.json())
            .then(Data => {
                QuoteObj = Data.map(item => item);
            })
            .catch(error => {
                console.log("Couldn't fetch data Some error occured");
                console.log(error);
            });
    }

    randomQuote() {
        var count = Math.floor(Math.random() * QuoteObj.length) + 1;
        //var quotedQuote = "\""+QuoteObj[count].text+"\"";
        //var quotedQuote = `"${QuoteObj[count].text}"`;
        //var quotedAuthor = `"${QuoteObj[count].author}"`;
        this.setState({
            Quote: QuoteObj[count].text,
            Author: QuoteObj[count].author
        })
    }

    render() {

        return (
            <div id="quote-box">
                <p id="text">{this.state.Quote}</p>
                <p id="author">{this.state.Author}</p>
                <div id="mybuttons">
                    <span><a id="tweet-quote" href={`https://twitter.com/intent/tweet/?text="${this.state.Quote}" ${this.state.Author}`} target="_blank" ><i class="fa fa-twitter"></i></a></span>
                    <Button variant="contained" onClick={this.randomQuote} type="submit" id="new-quote">Click me</Button>
                    {/*<Button variant="contained" onClick={()=>{
                        window.open("https://twitter.com/intent/tweet/?text=" + encodeURIComponent(this.state.Quote+' -- '+this.state.Author))
                    }} id="new-quote">Tweet Quote<i class="fa fa-twitter"></i></Button>*/}
                    {/*<MDBBtn size="lg" social="tw">twitter   
                        <MDBIcon fab icon="twitter" />
        </MDBBtn>*/}
                </div>
            </div >
        )
    }

}

export default QuotesGenerator;