import { View, ViewProps } from 'react-native'
import { Text, TextProps } from './Themed'
import { Fragment, PropsWithChildren } from 'react'
import { Style } from '@/lib/react'

export function MonoText(props: StyledTextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />
}

type StyledTextProps = TextProps & {
  Container?: React.ElementType<ViewProps>
  containerStyle?: Style
}

function Title({
  Container = View,
  containerStyle,
  ...props
}: StyledTextProps & {
  size: number
}) {
  return (
    <Container
      style={[
        {
          marginBottom: props.size / 2,
        },
        containerStyle,
      ]}>
      <Text
        {...props}
        style={[
          props.style,
          {
            fontSize: props.size,
            fontWeight: 'bold',
          },
        ]}
      />
    </Container>
  )
}

export function H1(props: StyledTextProps) {
  return <Title size={42} {...props} />
}

export function H2(props: StyledTextProps) {
  return <Title size={28} {...props} />
}

export function H3(props: StyledTextProps) {
  return <Title size={20} {...props} />
}

export function H4(props: StyledTextProps) {
  return <Title size={16} {...props} />
}

export function H5(props: StyledTextProps) {
  return <Title size={14} {...props} />
}

export function H6(props: StyledTextProps) {
  return <Title size={10} {...props} />
}

export function P(props: StyledTextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontSize: 12, fontWeight: 'normal' }]}
    />
  )
}
