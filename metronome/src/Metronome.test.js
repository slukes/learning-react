import React from 'react';
import {mount} from 'enzyme';
import Metronome from './Metronome';

jest.useFakeTimers();
let container = null;

beforeEach(() => {
    container = mount(<Metronome/>);
});

test('BPM should have default value', () => {
    expect(container.find('#bpmSliderLabel').text()).toBe("120 BPM");
    expect(container.find('#bpmSliderInput').prop("value")).toBe(120);
});

test('BPM label should update with slider', () => {
    container.find('#bpmSliderInput').at(0).simulate('change', {target: {value: 0}});
    expect(container.find('#bpmSliderLabel').text()).toBe("0 BPM");
});
