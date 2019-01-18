<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:xdt="http://www.w3.org/2005/xpath-datatypes">
	<xsl:output method="html" version="1.1" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<xsl:element name="html">
			<xsl:element name="head">
				<xsl:element name="link"><xsl:attribute name="rel">stylesheet</xsl:attribute><xsl:attribute name="type">text/css</xsl:attribute><xsl:attribute name="href">FixtureReport.Onyx.css</xsl:attribute></xsl:element>
				<xsl:element name="title">"<xsl:value-of select="Fixtures/@showName"/>" - Onyx Patch Summary</xsl:element>
			</xsl:element>
			<xsl:element name="body">
				<xsl:element name="h1">"<xsl:value-of select="Fixtures/@showName"/>" - Onyx Patch Summary</xsl:element>
				<xsl:element name="p">
					<xsl:attribute name="class">body</xsl:attribute>
				  This is a summary of the Onyx patch for show "<xsl:value-of select="Fixtures/@showName"/>"
				  <xsl:element name="b">
				    (requires software build
				    <xsl:if test="Fixtures/@showBuild &gt; 65535">
							<xsl:value-of select="(Fixtures/@showBuild - (Fixtures/@showBuild mod 16777216)) div 16777216"/><xsl:text>.</xsl:text>
							<xsl:value-of select="((Fixtures/@showBuild - (Fixtures/@showBuild mod 65536)) div 65536) mod 256"/><xsl:text>.</xsl:text>
						</xsl:if>
						<xsl:value-of select="Fixtures/@showBuild mod 65536"/><xsl:text>)</xsl:text>
					</xsl:element>
					<xsl:text>.</xsl:text>
				</xsl:element>
				<xsl:apply-templates select="@* | node()"/>
				<!--
				<xsl:element name="p">
					<xsl:attribute name="class">body</xsl:attribute>
					Page last updated: <xsl:value-of select="Manufacturers/@time"/> CET
				</xsl:element>
-->
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template match="Fixtures">
		<xsl:element name="table">
			<xsl:attribute name="class">table</xsl:attribute>
			<!-- <xsl:attribute name="border">1</xsl:attribute> -->
			<xsl:element name="thead">
				<xsl:element name="tr">
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>ID</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Name</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Manufacturer</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Model &amp; personality</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Universe</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Address</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Invert</xsl:element>
				</xsl:element>
				<xsl:apply-templates select="Fixture"/>
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template match="Fixture">
		<xsl:variable name="fixtureClass">
			<xsl:choose>
				<xsl:when test="(position() mod 2) = 1">bodyOdd</xsl:when>
				<xsl:otherwise>bodyEven</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:element name="tbody">
			<xsl:element name="tr">
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
					<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:attribute name="rowspan">
						<xsl:value-of select="count(Part) + 1 + number(@totalMultiPatches)"/>
					</xsl:attribute>
					<xsl:element name="b"><xsl:value-of select="@nr"/></xsl:element>
				</xsl:element>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:attribute name="rowspan"><xsl:value-of select="count(DMXChannel)"/></xsl:attribute>
					<xsl:element name="b"><xsl:value-of select="@name"/></xsl:element>
				</xsl:element>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:attribute name="rowspan"><xsl:value-of select="count(DMXChannel)"/></xsl:attribute>
					<xsl:value-of select="@manufacturer"/>
				</xsl:element>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:attribute name="rowspan"><xsl:value-of select="count(DMXChannel)"/></xsl:attribute>
					<xsl:value-of select="@displayName"/>
				</xsl:element>
				<xsl:apply-templates select="DMXChannel[1]">
					<xsl:with-param name="fixtureClass" select="$fixtureClass"/>
				</xsl:apply-templates>
				<xsl:for-each select="DMXChannel[position() &gt; 1]">
					<xsl:element name="tr">
						<xsl:apply-templates select=".">
							<xsl:with-param name="fixtureClass" select="$fixtureClass"/>
						</xsl:apply-templates>
					</xsl:element>
				</xsl:for-each>
				<xsl:for-each select="Part">
					<xsl:if test="./DMXChannel">
						<xsl:element name="tr">
							<xsl:apply-templates select=".">
								<xsl:with-param name="fixtureClass" select="$fixtureClass"/>
							</xsl:apply-templates>
						</xsl:element>
					</xsl:if>
				</xsl:for-each>
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template match="Part">
		<xsl:param name="fixtureClass"/>
		<xsl:element name="td">
			<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
			<xsl:attribute name="VALIGN">TOP</xsl:attribute>
			<xsl:attribute name="rowspan"><xsl:value-of select="count(DMXChannel)"/></xsl:attribute>
			<xsl:element name="b">.<xsl:value-of select="@nr"/></xsl:element> : <xsl:value-of select="@name"/>
		</xsl:element>
		<xsl:element name="td">
			<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
			<xsl:attribute name="VALIGN">TOP</xsl:attribute>
			<xsl:attribute name="rowspan"><xsl:value-of select="count(DMXChannel)"/></xsl:attribute>
			<xsl:value-of select="ancestor::Fixture/@manufacturer"/>
		</xsl:element>
		<xsl:element name="td">
			<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
			<xsl:attribute name="VALIGN">TOP</xsl:attribute>
			<xsl:attribute name="rowspan"><xsl:value-of select="count(DMXChannel)"/></xsl:attribute>
			<xsl:value-of select="ancestor::Fixture/@displayName"/>
		</xsl:element>
		<xsl:choose>
			<xsl:when test="DMXChannel">
				<xsl:apply-templates select="DMXChannel[1]">
					<xsl:with-param name="fixtureClass" select="$fixtureClass"/>
				</xsl:apply-templates>
				<xsl:for-each select="DMXChannel[position() &gt; 1]">
					<xsl:element name="tr">
						<xsl:apply-templates select=".">
							<xsl:with-param name="fixtureClass" select="$fixtureClass"/>
						</xsl:apply-templates>
					</xsl:element>
				</xsl:for-each>
			</xsl:when>
			<xsl:otherwise>
				<xsl:if test="parent::Fixture/DMXChannel">
					<xsl:element name="td">
						<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
						<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
						Auto
					</xsl:element>
					<xsl:element name="td">
						<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
						<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
						Auto
					</xsl:element>
				</xsl:if>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template match="DMXChannel">
		<xsl:param name="fixtureClass"/>
		<xsl:element name="td">
			<xsl:attribute name="class">
				<xsl:value-of select="$fixtureClass"/>
			</xsl:attribute>
			<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
			<xsl:choose>
				<xsl:when test="@universe and @universe != 0">
					<xsl:value-of select="@universe"/>
				</xsl:when>
				<xsl:otherwise>
          Auto
        </xsl:otherwise>
			</xsl:choose>
		</xsl:element>
		<xsl:element name="td">
			<xsl:attribute name="class">
				<xsl:value-of select="$fixtureClass"/>
			</xsl:attribute>
			<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
			<xsl:choose>
				<xsl:when test="@startAddress and @startAddress != 0">
					<xsl:value-of select="@startAddress"/>
				</xsl:when>
				<xsl:otherwise>
          Auto
        </xsl:otherwise>
			</xsl:choose>
		</xsl:element>
		<xsl:element name="td">
			<xsl:attribute name="class">
				<xsl:value-of select="$fixtureClass"/>
			</xsl:attribute>
			<xsl:attribute name="ALIGN">CENTER</xsl:attribute>
			<xsl:attribute name="VALIGN">TOP</xsl:attribute>
			<xsl:if test="@panInverted and @panInverted != 0">P</xsl:if>
			<xsl:if test="@tiltInverted and @tiltInverted != 0">T</xsl:if>
			<xsl:if test="@panTiltSwapped and @panTiltSwapped != 0">S</xsl:if>
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>
