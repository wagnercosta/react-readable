import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from "react-redux";
import { fetchCategories } from "../actions/categoriesActions";


class Categories extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    const { error, loading, categories } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <p>Categorias</p>
        <Nav className="d-md-none">
          {categories.map(categoria => 
            <NavItem key={categoria.path} >
              <NavLink href={categoria.path}>{categoria.name}</NavLink>
            </NavItem>
          )}
        </Nav>
        <Nav vertical className="d-none d-sm-block">
          {categories.map(categoria => 
              <NavItem key={categoria.path} >
                <NavLink href={categoria.path}>{categoria.name}</NavLink>
              </NavItem>
            )}
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.items,
  loading: state.categories.loading,
  error: state.categories.error
});



export default connect(mapStateToProps)(Categories);