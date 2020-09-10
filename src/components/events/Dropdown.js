import React from 'react';

const Dropdown = ({ options, selected, setSelected, label }) => {

	const handleSelectedChange = event => {
		setSelected(event);
	}

	const renderOptions = options.map(option => {
		return(
			<option key={option}>{option}</option>
		);
	});

	return(
		<div className="w-full max-w-lg">
			<div className="flex flex-wrap -mx-3 mb-6">
				<div className="w-full px-3 mb-3 md:mb-0">
					<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
		        { label }
		      </label>
		      <div className="relative">
						<select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="filter" value={selected} onChange={event => handleSelectedChange(event.target.value)}>
			        { renderOptions }
			      </select>
			      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          		<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          		</svg>
        </div>
			    </div>
				</div>
			</div>
		</div>
	);
};

export default Dropdown;
