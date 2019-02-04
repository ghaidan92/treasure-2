import React from "react";
import { MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBtn, MDBListGroup, MDBListGroupItem, MDBCol, MDBIcon } from "mdbreact";
import item from "../ItemInputCard";


class SearchBar extends React.Component {
    state = {
        dataSet: item,
        filteredSet: item,
        searchValue: "",
        modalOpen: false
    }

    handleSearch = event => this.setState({ searchValue: event.target.value }, () => this.searchForitem());

    searchForItem = () => {
        this.setState(prevState => {
            const filteredSet = prevState.dataSet.filter(item => item.toLowerCase().match(this.state.searchValue.toLowerCase()));
            return { filteredSet };
        });
    }

    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

    render() {
        return (
            <div>
                <MDBBtn onClick={this.toggleModal}>Click to open search modal</MDBBtn>

                <MDBModal isOpen={this.state.modalOpen} toggle={this.toggleModal} backdrop={false} size="sm" side position="top-right">
                    <MDBModalHeader toggle={this.toggleModal}>Modal title</MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput value={this.state.searchValue} onChange={this.handleSearch} hint="Search for item" type="text" containerClass="mt-0" />
                        <MDBListGroup>
                            {
                                this.state.filteredSet.map(item => (
                                    <MDBListGroupItem key={item}>{item}</MDBListGroupItem>
                                ))
                            }
                        </MDBListGroup>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggleModal}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </div>
        );
    }
}

export default SearchBar;