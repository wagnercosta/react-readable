import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from "react-redux";
import { fetchCategories } from "../actions/categoriesActions";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


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
            <li className="navItem" key={categoria.path}>
              <Link to={`/category/${categoria.path}`}>{categoria.path}</Link>
            </li>
          )}
        </Nav>
        <Nav vertical className="d-none d-sm-block">
          {categories.map(categoria => 
              <li className="navItem" key={categoria.path} >
                <Link to={`/category/${categoria.path}`}>{categoria.path}</Link>
              </li>
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